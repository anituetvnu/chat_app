/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import database from '@react-native-firebase/database';
import {getChatUID} from '../../../../service/firebase/getChatUID';
import {createChatUID} from '../../../../service/firebase/createChatUID';
import {setChat} from '../../../../actions/chat';

import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';

const MessagesScreen = ({navigation, route}) => {
  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState(Array.from({}));
  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const dispatch = useDispatch();

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    const listUsers = [];
    const onValueChange = database()
      .ref('Chats')
      .on('child_added', (snap) => {
        const last_message = snap.val()[2] === 'created' ? null : snap.val()[2];
        console.log('snap', snap.val());
        if (user.id == snap.val()[0]) {
          database()
            .ref(`Users/${snap.val()[1]}`)
            .once('value', (snap) => {
              const temp = snap.val();
              if (last_message) temp['last_message'] = last_message;
              // console.log(temp);
              listUsers.push(temp);
              setUsers(listUsers);
            });
        } else if (user.id == snap.val()[1]) {
          database()
            .ref(`Users/${snap.val()[0]}`)
            .once('value', (snap) => {
              const temp = snap.val();
              if (last_message) temp['last_message'] = last_message;
              // console.log(temp);
              listUsers.push(temp);
              setUsers(listUsers);
            });
        }
      });
    return () => {
      database().ref('Chats').off('child_added', onValueChange);
    };
  }, [user.id, refresh]);

  const timeCompare = (time) => {
    if (!time) return null;
    const t = new Date().getTime() - time;
    if (t / 1000 / 60 / 60 / 24 >= 1) {
      return Math.floor(t / 1000 / 60 / 60 / 24) + ' ngày trước';
    } else if (t / 1000 / 60 / 60 >= 1) {
      return Math.floor(t / 1000 / 60 / 60) + ' giờ trước';
    } else if (t / 1000 / 60 >= 1) {
      return Math.floor(t / 1000 / 60) + ' phút trước';
    } else {
      return Math.floor(t / 1000) + ' giây trước';
    }
  };
  // const [lastMessage, setLastMessage] = useState('');
  // useEffect(() => {}, [lastMessage]);
  const renderItem = ({item}) => {
    // setLastMessage(item.last_message?.message);
    return (
      <TouchableOpacity
        style={styles.chatCard}
        onPress={() => {
          getChatUID(user.id, item.id).then((UID) => {
            if (UID) {
              const action = setChat({
                chatUID: UID,
                userUID: item.id,
                userName: item.fullName,
                userAvatarUrl: item.avatarUrl,
                token: item.token,
              });
              dispatch(action);
              navigation.navigate('Conversation');
            } else {
              createChatUID(user.id, item.id).then((UID) => {
                const action = setChat({
                  chatUID: UID,
                  userUID: item.id,
                  userName: item.fullName,
                  userAvatarUrl: item.avatarUrl,
                  token: item.token,
                });
                dispatch(action);
                navigation.navigate('Conversation', {item: item});
              });
            }
          });
        }}>
        <Image source={{uri: item.avatarUrl}} style={styles.chatAvatar} />
        <View style={styles.chatContent}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.chatName}>{item.fullName}</Text>
            <Text style={styles.chatTime}>
              {timeCompare(item.last_message?.time)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.chatMessage}>
              {item.last_message?.message
                ? item.last_message?.message
                : 'hình ảnh'}
            </Text>
            {/* <Text style={styles.chatMessage}>{lastMessage}</Text> */}
            {/* <Text
              style={{
                width: 27,
                height: 27,
                borderRadius: 20,
                borderWidth: 1,
                textAlign: 'center',
                textAlignVertical: 'center',
              }}>
              {item.number}
            </Text> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chatList}>
        {/* <Text>{user.id}</Text>
          <Text>{user.email}</Text>
          <Text>{user.fullName}</Text> */}
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                onRefresh();
                setRefresh(!refresh);
              }}
            />
          }
          data={users.sort(
            (a, b) => -(a.last_message?.time - b.last_message?.time),
          )}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default MessagesScreen;
