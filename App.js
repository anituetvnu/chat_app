import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen/RegistrationScreen';
import HomeBottomTabScreen from './src/screens/HomeBottomTabScreen/HomeBottomTabScreen';
import store from './src/store';
// import {fcmService} from './src/Notification/FCMService';
// import {localNotificationService} from './src/Notification/LocalNotificationService';

// webrtc push notification icon location

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  // useEffect(() => {
  //   fcmService.registerAppWithFCM();
  //   fcmService.register(onRegister, onNotification, onOpenNotification);
  //   localNotificationService.configure(onOpenNotification);
  // }, []);

  // const onRegister = (token) => {
  //   console.log('[App] Token', token);
  // };

  // const onNotification = (notify) => {
  //   // console.log("[App] onNotification", notify);
  //   const options = {
  //     soundName: 'default',
  //     playSound: true,
  //   };

  //   localNotificationService.showNotification(
  //     0,
  //     notify.notification.title,
  //     notify.notification.body,
  //     notify,
  //     options,
  //   );
  // };

  // const onOpenNotification = async (notify) => {
  //   console.log('notify', notify);
  // };

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
