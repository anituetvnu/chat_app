import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MessagesStackScreen from './MessagesStackScreen/MessagesStackScreen';
import SearchScreen from './SearchScreen/SearchScreen';
import AccountStackScreen from './AccountStackScreen/AccountStackScreen';

const Tab = createBottomTabNavigator();

const iconColor = 'rgb(72, 163, 255)';

const routeIcons = {
  Message: 'message-text',
  Search: 'account-box-multiple',
  Account: 'account-settings',
  Call: 'phone',
};

const HomeBottomTabScreen = ({navigation, route}) => {
  return (
    <Tab.Navigator
      initialRouteName="Messages"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => (
          <MaterialCommunityIcons
            name={routeIcons[route.name]}
            size={24}
            color={focused ? iconColor : 'grey'}
          />
        ),
      })}
      tabBarOptions={{
        activeTintColor: iconColor,
        inactiveTintColor: 'grey',
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen
        name="Message"
        component={MessagesStackScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Account"
        component={AccountStackScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default HomeBottomTabScreen;
