import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import database from '@react-native-firebase/database';
import styles from './styles';
import {useSelector, useDispatch} from 'react-redux';
import {getChatUID} from '../../../service/firebase/getChatUID';
import {createChatUID} from '../../../service/firebase/createChatUID';
import {setChat} from '../../../actions/chat';

const SearchScreen = ({navigation, route}) => {
  const [users, setUsers] = useState([]);
  const user = useSelector((state) => state.user);
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
          // navigation.navigate("Conversation", item);
          getChatUID(user.id, item.id).then((UID) => {
            if (UID) {
              const action = setChat({
                chatUID: UID,
                userUID: item.id,
              });
              dispatch(action);
              navigation.navigate('Conversation');
            } else {
              createChatUID(user.id, item.id).then((UID) => {
                const action = setChat({
                  chatUID: UID,
                  userUID: item.id,
                });
                dispatch(action);
                navigation.navigate('Conversation');
              });
            }
          });
        }}>
        <View>
          <Text style={styles.chatName}>{item.fullName}</Text>
          <Text style={styles.chatName}>{item.email}</Text>
          <Text style={styles.chatName}>{item.id}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {}}></TouchableOpacity>
      <View style={styles.chatList}>
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default SearchScreen;
