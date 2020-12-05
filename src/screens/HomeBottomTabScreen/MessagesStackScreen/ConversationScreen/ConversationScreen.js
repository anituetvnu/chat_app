import React, {useState, useEffect, Fragment} from 'react';
import {
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import sendMessage from '../../../../service/firebase/sendMessage';
import sendNotification from '../../../../service/firebase/sendNotification';
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
  const [fileData, setFileData] = useState('');
  const [fileUri, setFileUri] = useState('');
  const [imagesUrl, setImagesUrl] = useState({});
  const chat = useSelector((state) => state.chat);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
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
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setFileData(response.data);
        setFileUri(response.uri);
        console.log('type :', typeof response);
        console.log('key :', Object.keys(response));
        console.log('uri :', response.uri);
        console.log('filesize :', response.fileSize);
      }
    });
  };

  const uploadImage = async () => {
    if (!fileUri) return;
    const filename = fileUri.substring(fileUri.lastIndexOf('%') + 1);
    const uri = await getPathForFirebaseStorage(fileUri);
    const uploadTask = storage().ref(filename).putFile(uri);

    uploadTask.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
    });

    uploadTask.then(() => {
      console.log('Image uploaded to the bucket!');
      setFileUri('');
      setFileData('');
    });
  };

  const renderFileUri = () => {
    if (fileUri) {
      return <Image source={{uri: fileUri}} style={styles.loadedImage} />;
    } else {
      return;
    }
  };

  const createObj = (base, name, url) => {
    const obj = {...base};
    obj[name] = url;
    return obj;
  };

  useEffect(() => {
    setMessage(Array.from({}));
    setImagesUrl({});
    var listMessages = [];
    const onValueChange = database()
      .ref(`UsersMessages/${chat.chatUID}`)
      .on('child_added', (snapshot) => {
        database()
          .ref(`Messages/${snapshot.val()}`)
          .once('value', (snap) => {
            listMessages = [snap.val()].concat(listMessages);
            setMessages(listMessages);
            const time = snap.val().time;
            if (snap.val().imageName) {
              storage()
                .ref(`${snap.val().imageName}`)
                .getDownloadURL()
                .then((url) => {
                  const obj = createObj(imagesUrl, snap.val().time, url);
                  setImagesUrl(obj);
                });
            }
          });
      });

    return () =>
      database()
        .ref(`UsersMessages/${chat.chatUID}`)
        .off('child_added', onValueChange);
  }, [user.id, chat.chatUID]);

  const renderMessageItem = ({item}) => {
    console.log('item ', item);
    return (
      <View>
        {item.sentBy == user.id ? (
          <View style={styles.rightBox}>
            {item.message ? (
              <Text style={styles.rightMessage}>{item.message}</Text>
            ) : (
              <></>
            )}
            {imagesUrl[`${item.time}`] ? (
              <Image
                source={{
                  uri: imagesUrl[`${item.time}`],
                }}
                style={styles.image}
              />
            ) : (
              <></>
            )}
          </View>
        ) : (
          <View style={{flexDirection: 'row', marginVertical: 3}}>
            <Image
              source={{
                uri: user.avatarUrl,
              }}
              style={styles.avatarImage}
            />
            <View style={styles.leftBox}>
              {item.message ? (
                <Text style={styles.leftMessage}>{item.message}</Text>
              ) : (
                <></>
              )}
              {imagesUrl[`${item.time}`] ? (
                <Image
                  source={{
                    uri: imagesUrl[`${item.time}`],
                  }}
                  style={styles.image}
                />
              ) : (
                <></>
              )}
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderEmptyMessages = ({}) => {
    return <Text></Text>;
  };

  return (
    <Fragment>
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
        {console.log(user)}
        {renderFileUri()}
        <View style={styles.inputArea}>
          <TouchableOpacity
            onPress={() => {
              launchImageLibrary();
            }}>
            <Ionicons name="image" style={styles.linkButton} />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Aa"
            value={message}
            onChangeText={(value) => setMessage(value)}
          />
          <TouchableOpacity
            onPress={() => {
              sendMessage(message, user.id, chat.chatUID, fileUri).then(
                setMessage,
              );
              uploadImage();
              sendNotification(
                chat.token,
                user.fullName,
                message ? message : `${user.fullName} đã gửi hình ảnh`,
              );
            }}>
            <Ionicons name="send" style={styles.linkButton} />
          </TouchableOpacity>
        </View>
      </View>
    </Fragment>
  );
};

export default ConversationScreen;
