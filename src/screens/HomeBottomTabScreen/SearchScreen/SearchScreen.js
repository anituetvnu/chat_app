import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
import database from '@react-native-firebase/database';
import styles from './styles';
import {useSelector, useDispatch} from 'react-redux';
import {getChatUID} from '../../../service/firebase/getChatUID';
import {createChatUID} from '../../../service/firebase/createChatUID';
import {setChat} from '../../../actions/chat';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const SearchScreen = ({navigation, route}) => {
  const [users, setUsers] = useState([]);
  const [fillUsers, setFillUsers] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const listUsers = [];
    const onValueChange = database()
      .ref('Users')
      .on('child_added', (snap) => {
        listUsers.push(snap.val());
        setUsers(listUsers);
        setFillUsers(listUsers);
      });
    return () => {
      database().ref('Users').off('child_added', onValueChange);
    };
  }, []);
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.chatCard}
        onPress={() => {
          console.log(item.avatarUrl);
          navigation.navigate('Message', {item: item});
          getChatUID(user.id, item.id).then((UID) => {
            if (UID) {
              const action = setChat({
                chatUID: UID,
                userUID: item.id,
                userName: item.fullName,
                userAvatarUrl: item.avatarUrl,
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
                });
                dispatch(action);
                navigation.navigate('Conversation');
              });
            }
          });
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{marginHorizontal: 10}}>
            <Image
              source={{
                uri: item.avatarUrl,
              }}
              style={styles.chatAvatar}
            />
          </View>
          <View>
            <Text style={styles.chatName}>{item.fullName}</Text>
            <Text style={styles.chatName}>email: {item.email}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <EvilIcons name="search" style={styles.iconHeader} />
        <TextInput
          style={styles.textInput}
          placeholder="Tìm kiếm bạn bè ..."
          placeholderTextColor="rgb(229, 247, 255)"
          onChangeText={(value) => {
            const newUsers = [];
            users.map((user) => {
              let val = value.toUpperCase();
              let name = user.fullName.toUpperCase();
              if (name.search(val) >= 0) {
                newUsers.push(user);
              }
              setFillUsers(newUsers);
            });
          }}></TextInput>
      </View>
      <View style={styles.chatList}>
        <FlatList
          data={fillUsers}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default SearchScreen;
