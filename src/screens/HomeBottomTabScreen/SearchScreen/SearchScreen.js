import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, FlatList, TextInput} from 'react-native';
import database from '@react-native-firebase/database';
import styles from './styles';
import {useSelector, useDispatch} from 'react-redux';
import {getChatUID} from '../../../service/firebase/getChatUID';
import {createChatUID} from '../../../service/firebase/createChatUID';
import {setChat} from '../../../actions/chat';
import Feather from 'react-native-vector-icons/Feather';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const Search = ({navigation, route}) => {
  const [users, setUsers] = useState([]);
  const [fillUsers, setFillUsers] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const listUsers = [];
    database()
      .ref('Users')
      .on('child_added', (snap) => {
        listUsers.push(snap.val());
        setUsers(listUsers);
        setFillUsers(listUsers);
      });
  }, []);
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.chatCard}
        onPress={() => {
          navigation.navigate('Messages', {item: item});
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
          <Text style={styles.chatName}>name: {item.fullName}</Text>
          <Text style={styles.chatName}>email: {item.email}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', marginVertical: 10}}>
        <TextInput
          style={styles.textInput}
          placeholder="Search by name ..."
          onChangeText={(value) => {
            const newUsers = [];
            console.log(newUsers);
            users.map((user) => {
              let name = user.fullName;
              if (name.search(value) >= 0) {
                newUsers.push(user);
              }
              setFillUsers(newUsers);
            });
          }}></TextInput>
      </View>
      <TouchableOpacity onPress={() => {}}></TouchableOpacity>
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

const SearchScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'rgb(72, 163, 255)',
          height: 50,
        },
      }}>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: 'People',
          headerTitleAlign: 'center',
          headerTintColor: 'white',
        }}
      />
    </Stack.Navigator>
  );
};

export default SearchScreen;
