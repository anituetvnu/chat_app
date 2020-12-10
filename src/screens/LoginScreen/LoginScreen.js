import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
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
  const [logIn, setLogIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState('');
  const [transparent, setTransparent] = useState(0.5);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  // save token to store
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

  // check email and password were filled
  useEffect(() => {
    if (email && password) {
      setLogIn(false);
      setTransparent(1);
    } else {
      setLogIn(true);
      setTransparent(0.5);
    }
  }, [email, password]);

  const onFooterLinkPress = () => {
    navigation.navigate('Registration');
  };

  const onLoginPress = () => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        // console.log('response: ', response);
        // const token = await AsyncStorage.getItem('@token').then(console.log);
        const ref = database()
          .ref(`Users/${uid}`)
          .once('value', (snap) => {
            database().ref(`Users/${uid}/token`).set(token);
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
        // alert(error);
        setWarning(String(error));
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home', {
            screen: 'Call',
            params: {
              screen: 'Home',
              params: {
                access_token:
                  'eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTS0YwVE1wcTRRWVVZUXAxVFBSUU1sczRVcmd6V2VVSWZ1LTE2MDc1OTEwMjAiLCJpc3MiOiJTS0YwVE1wcTRRWVVZUXAxVFBSUU1sczRVcmd6V2VVSWZ1IiwiZXhwIjoxNjEwMTgzMDIwLCJ1c2VySWQiOiJ6eGN2In0.uUjN0quJtq7z0nbNxJ8TVe1jrkBfzxVsyAIDfiBJSQA',
              },
            },
          });
        }}>
        <Text>user: zxcv</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home', {
            screen: 'Call',
            params: {
              screen: 'Home',
              params: {
                access_token:
                  'eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTS0YwVE1wcTRRWVVZUXAxVFBSUU1sczRVcmd6V2VVSWZ1LTE2MDc1OTEwNTAiLCJpc3MiOiJTS0YwVE1wcTRRWVVZUXAxVFBSUU1sczRVcmd6V2VVSWZ1IiwiZXhwIjoxNjEwMTgzMDUwLCJ1c2VySWQiOiJ2Y3hhIn0.YN45opNr3Lj68c-xyOxsQllBkMAoahBYhqZuP7bsKls',
              },
            },
          });
        }}>
        <Text>user: dcba</Text>
      </TouchableOpacity> */}
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
          style={[styles.button, {opacity: transparent}]}
          onPress={() => onLoginPress()}>
          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <Text style={styles.buttonTitle}>Log in</Text>
          )}
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don't have an account?{' '}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Sign up
            </Text>
          </Text>
        </View>
        <View style={styles.warningView}>
          <Text style={styles.warningText}>{warning}</Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
