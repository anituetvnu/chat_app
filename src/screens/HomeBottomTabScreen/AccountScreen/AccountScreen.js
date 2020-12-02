import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

const AccountScreen = ({navigation}) => {
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
        {text: 'OK', onPress: () => navigation.replace('Login', {data: user})},
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My account</Text>
        <TouchableOpacity style={styles.buttonLogOut} onPress={() => logOut()}>
          <View>
            <MaterialCommunityIcons name="logout" style={styles.button} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.avatarWrapper}>
        <Image
          source={{
            uri: user.avatarUrl,
          }}
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
      <View style={styles.body}>
        <View style={styles.headerBody}>
          <Image
            source={{
              uri: user.avatarUrl,
            }}
            style={styles.avatarHeader}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Hôm nay bạn thế nào ..."
            placeholderTextColor="grey"
            onChangeText={() => console.log(123)}></TextInput>
        </View>
      </View>
    </View>
  );
};

export default AccountScreen;
