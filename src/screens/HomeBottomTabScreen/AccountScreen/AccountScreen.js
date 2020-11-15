import React from 'react';
import {Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

const socialInfo = [
  {name: 'Photos', quantity: 210},
  {name: 'Followers', quantity: '15k'},
  {name: 'Following', quantity: 605},
];

const Account = ({navigation}) => {
  const user = useSelector((state) => state.user);
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
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image
          source={require('../../../../assets/1.jpg')}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.fullName}</Text>
          <Text style={styles.userJob}>{user.email}</Text>
          <View style={styles.followAndSend}>
            <Text style={styles.follow} onPress={() => alert('follow')}>
              Follow
            </Text>
            <Feather
              name="send"
              style={styles.sendMessage}
              onPress={() => alert('send a message')}
            />
          </View>
        </View>
      </View>

      <View style={styles.infoCounter}>
        {socialInfo.map((info) => {
          return (
            <View style={styles.box}>
              <Text style={styles.number}>{info.quantity}</Text>
              <Text style={styles.content}>{info.name}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.logOut}>
        <TouchableOpacity style={styles.buttonLogOut} onPress={() => logOut()}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 20,
              padding: 5,
            }}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function AccountScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'rgb(72, 163, 255)',
          height: 50,
        },
      }}>
      <Stack.Screen
        options={{
          title: 'Account',
          headerTintColor: 'white',
          headerTitleAlign: 'center',
        }}
        name="Account"
        component={Account}
      />
    </Stack.Navigator>
  );
}
