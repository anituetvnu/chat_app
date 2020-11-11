import React, {useState, useEffect} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {useDispatch} from 'react-redux';
import {logInUser} from '../../actions/user';

export default function LoginScreen({navigation, route}) {
  const [email, setEmail] = useState('acc1@gmail.com');
  const [password, setPassword] = useState('123123');
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(route.params?.data);
    const user = route.params?.data;
    if (user) {
      console.log(route.params?.data.email);
      console.log(route.params?.data.password);
      setEmail(route.params?.data.email);
      setPassword(route.params?.data.password);
    } else {
      console.log('no email password');
    }
  }, [route.params?.data]);
  const onFooterLinkPress = () => {
    navigation.navigate('Registration');
  };

  const onLoginPress = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const ref = database()
          .ref(`Users/${uid}`)
          .once('value', (snap) => {
            console.log(snap.val());
            const user = snap.val();
            const action = logInUser(user);
            dispatch(action);
            navigation.replace('Home', {
              screen: 'MessagesStack',
              params: {
                screen: 'Messages',
              },
            });
          });
        // firebase.messaging().getToken().then(console.log);
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{flex: 1, width: '100%'}}
        keyboardShouldPersistTaps="always">
        <Image
          style={styles.logo}
          source={require('../../../assets/icon.png')}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={() => onLoginPress()}>
          <Text style={styles.buttonTitle}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don't have an account?{' '}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Sign up
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
