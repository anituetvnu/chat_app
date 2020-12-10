import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  FlatList,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';
import {useSelector} from 'react-redux';
import database from '@react-native-firebase/database';

const ProfileScreen = ({navigation}) => {
  const user = useSelector((state) => state.user);
  const [story, setStory] = useState();
  const [stories, setStories] = useState(Array.from({}));

  useEffect(() => {
    var listStory = [];
    const onValueChange = database()
      .ref(`Posts/${user.id}`)
      .on('child_added', (snap) => {
        listStory = [snap.val()].concat(listStory);
        setStories(listStory);
        console.log(snap.val());
        console.log('list', listStory);
        // console.log('snap :', [...stories, snap.val()]);
      });
    return () => {
      database().ref(`Posts/${user.id}`).off('child_added', onValueChange);
    };
  }, [user.id]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.chatCard}>
        <Image source={{uri: user.avatarUrl}} style={styles.chatAvatar} />
        <View style={styles.chatContent}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.chatTime}>{timeCompare(item.time)}</Text>
            <Text style={styles.chatName}>{item.story}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

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

  return (
    <View style={styles.container}>
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
          <View style={{flexDirection: 'column'}}>
            <TextInput
              style={styles.textInput}
              placeholder="Hôm nay bạn thế nào ..."
              placeholderTextColor="grey"
              value={story}
              onChangeText={(value) => setStory(value)}
            />
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                marginTop: 5,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: 'rgb(72, 163, 255)',
                backgroundColor: 'rgb(72, 163, 255)',
                padding: 5,
                width: 60,
              }}
              onPress={() => {
                if (story)
                  database()
                    .ref(`Posts/${user.id}`)
                    .push({story: story, time: new Date().getTime()}, () => {
                      setStory('');
                    });
              }}>
              <Text style={{color: 'white', alignSelf: 'center'}}>Đăng</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={stories}
          renderItem={renderItem}
          keyExtractor={(item) => item.time}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;
