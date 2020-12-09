import React from 'react';
import {TouchableOpacity, Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ProfileScreen from './ProfileScreen/ProfileScreen';
import EditScreen from './EditScreen/EditScreen';
import styles from './styles';

const Stack = createStackNavigator();

const AccountStackScreen = ({navigation, route}) => {
  const logOut = () => {
    Alert.alert(
      'Message',
      'Do you want to log out ?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => navigation.replace('Login')},
      ],
      {cancelable: false},
    );
  };

  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerStyle: {backgroundColor: 'rgb(72, 163, 255)', height: 50},
      }}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Chat App',
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerLeft: (props) => (
            <TouchableOpacity
              onPress={() => {
                navigation.push('Edit');
              }}>
              <Feather name="settings" style={styles.button} />
            </TouchableOpacity>
          ),
          headerRight: (props) => (
            <TouchableOpacity onPress={() => logOut()}>
              <MaterialCommunityIcons name="logout" style={styles.button} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Edit"
        component={EditScreen}
        options={{
          title: 'Edit',
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          tabBarVisible: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default AccountStackScreen;
