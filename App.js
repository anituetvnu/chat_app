import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';
import store from './src/store';

import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen/RegistrationScreen';
import HomeBottomTabScreen from './src/screens/HomeBottomTabScreen/HomeBottomTabScreen';
import {setToken} from './src/actions/token';

// webrtc push notification icon location

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const FIREBASE_API_KEY =
      'AAAAErsIZ9o:APA91bGQvDAIofTk-JJnvBaCYGicl9CTCGhWmUgXuvbBpBTR5UGtG44cwacAI2vAAA10i7QHIhi0x6hk3lW3VG8TUic7mJoBpPNBQK9sEoYz_7DHrSgmMFvO33AaTrWh9D-GRbPOPbCp';
    const message = JSON.stringify({
      registration_ids: [
        'cRoTWZruRUCkEJ7zOvsM3r:APA91bFbzrIlR-bgnXYYL0Sg7pP41h5AomAw4WGp90dT4zHrFONOsg1jaT-RG49KciuYI2uKsrqnYc2oMLmwST3ciT2iBW0p2_VtQj2fob0wnGFDrc6oGpaMw-8am3_enVoXiZICnlcN',
      ],
      notification: {
        title: 'FCM Message',
        body: 'This is an FCM notification message!',
      },
    });
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'key=' + FIREBASE_API_KEY,
      },
      body: message,
    };
    fetch('https://fcm.googleapis.com/fcm/send', requestOptions)
      .then((response) => response.json())
      .then((data) => console.log('data: ', data))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Home" options={{headerShown: false}}>
            {(props) => <HomeBottomTabScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
