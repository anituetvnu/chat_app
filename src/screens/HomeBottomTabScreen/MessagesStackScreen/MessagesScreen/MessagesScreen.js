/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, Image, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import database from '@react-native-firebase/database';
import styles from './styles';

const fake_chat = [
  {
    name: 'ny1',
    avatar: require('../../../../../assets/1.jpg'),
    last_message: 'Em ăn cơm chưa?',
    last_message_time: '17h30',
    number: 3,
  },
  {
    name: 'ny2',
    avatar: require('../../../../../assets/1.jpg'),
    last_message: 'Em làm gì đấy?',
    last_message_time: '17h30',
    number: 10,
  },
  {
    name: 'ny3',
    avatar: require('../../../../../assets/1.jpg'),
    last_message: 'ví dụ ní dụdv',
    last_message_time: '17h30',
    number: 20,
  },
  {
    name: 'ny4',
    avatar: require('../../../../../assets/1.jpg'),
    last_message: '123456789',
    last_message_time: '17h30',
    number: 8,
  },
  {
    name: 'ny5',
    avatar: require('../../../../../assets/1.jpg'),
    last_message: '123456789',
    last_message_time: '17h30',
    number: 15,
  },
];

const MessagesScreen = ({navigation, route}) => {
  const user = useSelector((state) => state.user);

  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const listUsers = [];
    database()
      .ref('Users')
      .on('child_added', (snap) => {
        listUsers.push(snap.val());
        setUsers(listUsers);
      });
  }, []);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.chatCard}
        onPress={() => {
          navigation.navigate('Conversation', item);
        }}>
        <Image source={item.avatar} style={styles.chatAvatar} />
        <View style={styles.chatContent}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.chatName}>{item.name}</Text>
            <Text style={styles.chatTime}>{item.last_message_time}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.chatMessage}>{item.last_message}</Text>
            <Text
              style={{
                width: 27,
                height: 27,
                borderRadius: 20,
                borderWidth: 1,
                textAlign: 'center',
                textAlignVertical: 'center',
              }}>
              {item.number}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatList}>
        <Text>{user.id}</Text>
        <Text>{user.email}</Text>
        <Text>{user.fullName}</Text>
        <FlatList
          data={fake_chat}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      </View>
    </View>
  );
};

export default MessagesScreen;
