import React, {useState, useEffect} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';

import {useDispatch, useSelector} from 'react-redux';
import {logInUser} from '../../actions/user';
import {setToken} from '../../actions/token';

export default function LoginScreen({navigation, route}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [logIn, setLogIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const saveToken = async () => {
      await messaging()
        .getToken()
        .then((token) => {
          console.log('token :', token);
          const action = setToken(token);
          dispatch(action);
        });
    };
    saveToken();
  }, []);

  useEffect(() => {
    if (email && password) setLogIn(false);
    else setLogIn(true);
  }, [email, password]);

  const onFooterLinkPress = () => {
    navigation.navigate('Registration');
  };

  const onLoginPress = () => {
    // setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        // console.log('response: ', response);
        // const token = await AsyncStorage.getItem('@token').then(console.log);
        database().ref(`Users/${uid}/token`).set(token);
        const ref = database()
          .ref(`Users/${uid}`)
          .once('value', (snap) => {
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
      })
      .catch((error) => {
        alert(error);
      });
  };

  if (loading) return <ActivityIndicator size="large" />;

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
        <TouchableOpacity
          disabled={logIn}
          style={styles.button}
          onPress={() => onLoginPress()}>
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
