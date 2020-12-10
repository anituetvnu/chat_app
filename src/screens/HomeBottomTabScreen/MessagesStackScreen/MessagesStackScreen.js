import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useSelector} from 'react-redux';

import MessagesScreen from './MessagesScreen/MessagesScreen';
import ConversationScreen from './ConversationScreen/ConversationScreen';
import CallScreen from './CallScreen/CallScreen';
import HomeScreen from './HomeScreen/HomeScreen';
import styles from './styles';

const Stack = createStackNavigator();

const MessagesStackScreen = ({navigation, route}) => {
  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);
  // console.disableYellowBox = true;
  return (
    <Stack.Navigator
      initialRouteName="Add"
      screenOptions={{
        headerStyle: {backgroundColor: 'rgb(72, 163, 255)', height: 50},
      }}>
      <Stack.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          title: 'Chat App',
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerLeft: (props) => (
            <TouchableOpacity
              onPress={() => {
                navigation.push('HomeCall', {name: user.fullName});
              }}>
              <SimpleLineIcons
                name="phone"
                style={[styles.navigateIcon, {fontSize: 30}]}
              />
            </TouchableOpacity>
          ),
          headerRight: (props) => (
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <EvilIcons name="search" style={styles.navigateIcon} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Conversation"
        component={ConversationScreen}
        options={{
          title: `${chat.userName}`,
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          tabBarVisible: true,
        }}
      />
      <Stack.Screen name="HomeCall" component={HomeScreen} />
      <Stack.Screen name="Call" component={CallScreen} />
    </Stack.Navigator>
  );
};

export default MessagesStackScreen;
