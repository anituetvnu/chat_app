import React, {useState, useEffect, Fragment} from 'react';
import {
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import sendMessage from '../../../../service/firebase/sendMessage';
import ImagePicker from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';

async function getPathForFirebaseStorage(uri) {
  if (Platform.OS === 'ios') return uri;
  const stat = await RNFetchBlob.fs.stat(uri);
  return stat.path;
}
const ConversationScreen = ({navigation, route}) => {
  const [messages, setMessages] = useState(Array.from({}));
  const [message, setMessage] = useState('');
  const [filePath, setFilePath] = useState({
    data: '',
    uri: '',
  });
  const [fileData, setFileData] = useState('');
  const [fileUri, setFileUri] = useState('');

  const chat = useSelector((state) => state.chat);
  const user = useSelector((state) => state.user);

  const launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        // console.log('response', JSON.stringify(response));
        setFilePath(response);
        setFileData(response.data);
        setFileUri(response.uri);
      }
    });
  };

  const launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setFilePath(response);
        setFileData(response.data);
        setFileUri(response.uri);
        console.log('type :', typeof response);
        console.log('key :', Object.keys(response));
        console.log('uri :', response.uri);
        console.log('filesize :', response.fileSize);
        console.log('filesize :', response.fileSize);

        // console.log('data :', fileData);
      }
    });
  };

  const sendImage = async () => {
    const filename = fileUri.substring(fileUri.lastIndexOf('/') + 1);
    const uri = await getPathForFirebaseStorage(fileUri);
    const uploadTask = ref.putFile(uri);

    // const task = storage()
    //   .ref(filename)
    //   .putFile(fileUri)
    //   .then(() => console.log('done'))
    //   .catch(console.log);

    // task.on('state_changed', (taskSnapshot) => {
    //   console.log(
    //     `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
    //   );
    // });

    // task.then(() => {
    //   console.log('Image uploaded to the bucket!');
    // });
  };

  const renderFileData = () => {
    if (fileData) {
      return (
        <Image
          source={{uri: 'data:image/jpeg;base64,' + fileData}}
          style={styles.images}
        />
      );
    } else {
      return (
        <Image
          source={require('../../../../../resource/dummy.png')}
          style={styles.images}
        />
      );
    }
  };

  const renderFileUri = () => {
    if (fileUri) {
      return <Image source={{uri: fileUri}} style={styles.images} />;
    } else {
      return (
        <Image
          source={require('../../../../../resource/galeryImages.jpg')}
          style={styles.images}
        />
      );
    }
  };
  useEffect(() => {
    var listMessages = [];
    const onValueChange = database()
      .ref(`UsersMessages/${chat.chatUID}`)
      .on('child_added', (snapshot) => {
        database()
          .ref(`Messages/${snapshot.val()}`)
          .once('value', (snap) => {
            listMessages = [snap.val()].concat(listMessages);
            setMessages(listMessages);
          });
      });

    // Stop listening for updates when no longer required
    return () =>
      database()
        .ref(`UsersMessages/${chat.chatUID}`)
        .off('child_added', onValueChange);
  }, [user.id, chat.chatUID]);

  const renderMessageItem = ({item}) => {
    return (
      <Text style={item.sentBy == user.id ? styles.message2 : styles.message1}>
        {item.message}
      </Text>
    );
  };

  const renderEmptyMessages = ({}) => {
    return <Text>No message</Text>;
  };

  return (
    <Fragment>
      {/* <SafeAreaView> */}
      <View style={styles.container}>
        <View style={styles.conversationArea}>
          <FlatList
            data={messages}
            inverted={true}
            renderItem={renderMessageItem}
            keyExtractor={(item) => String(item.time)}
            ListEmptyComponent={renderEmptyMessages}
          />
        </View>
        <Text>{user.id}</Text>
        <Text>{chat.userUID}</Text>
        <Text>{chat.chatUID}</Text>
        <Text>{fileUri}</Text>
        {renderFileData()}
        {renderFileUri()}
        <View style={styles.inputArea}>
          <TouchableOpacity
            onPress={() => {
              launchImageLibrary();
            }}>
            <AntDesign name="link" color="black" style={styles.linkButton} />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Aa"
            value={message}
            onChangeText={(value) => setMessage(value)}
          />
          <TouchableOpacity
            onPress={() => {
              sendMessage(message, user.id, chat.chatUID).then(setMessage);
              sendImage();
              console.log('send');
            }}>
            <Feather name="send" color="black" style={styles.linkButton} />
          </TouchableOpacity>
        </View>
      </View>
      {/* </SafeAreaView> */}
    </Fragment>
  );
};

export default ConversationScreen;
