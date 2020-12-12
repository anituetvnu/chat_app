import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableHighlight,
} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-date-picker';
import database from '@react-native-firebase/database';

import styles from './styles';
// avatar, name, email, birthday, sex, description

const EditScreen = () => {
  const user = useSelector((state) => state.user);

  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email ? user.email : '');
  const [sex, setSex] = useState(user.sex ? user.sex : ''); // Nam, Nữ, Khác
  const [description, setDescription] = useState(
    user.description ? user.description : '',
  );

  const [birthday, setBirthday] = useState(
    user.birthday ? new Date(user.birthday) : new Date(),
  );
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRe>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <DatePicker
              date={birthday}
              onDateChange={setBirthday}
              mode="date"
            />
            <TouchableHighlight
              onPress={() => {
                setModalVisible(false);
                console.log('set modal');
              }}>
              <Text style={styles.textStyle}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <KeyboardAwareScrollView>
        <Text style={styles.title}>Avatar</Text>
        <Image
          source={{
            uri: user.avatarUrl,
          }}
          style={styles.avatar}
        />
        <Text style={styles.title}>Tên</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
        <Text style={styles.title}>Email</Text>
        <TextInput
          style={[styles.input, {opacity: 0.55}]}
          value={email}
          onChangeText={setEmail}
          editable={false}
        />
        <Text style={styles.title}>Ngày sinh</Text>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Text style={[styles.input, {marginTop: 10}]}>
            {birthday.getDate()}/{birthday.getMonth() + 1}/
            {birthday.getFullYear()}
          </Text>
        </TouchableOpacity>
        <Text style={styles.title}>Giới tính</Text>
        <View style={[styles.input, {marginBottom: 20}]}>
          <Picker
            style={{height: 50}}
            selectedValue={sex}
            onValueChange={(itemValue, itemIndex) => {
              setSex(itemValue);
              console.log(itemValue);
            }}
            mode="dropdown">
            <Picker.Item label="Nam" value="Nam" />
            <Picker.Item label="Nữ" value="Nữ" />
            <Picker.Item label="Khác" value="Khác" />
          </Picker>
        </View>
        <Text style={styles.title}>Giới thiệu</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            database().ref(`Users/${user.id}`).set({
              avatarUrl: user.avatarUrl,
              email: user.email,
              fullName: name,
              id: user.id,
              token: user.token,
              birthday: birthday.getTime(),
              sex: sex,
              description: description,
            });
          }}>
          <Text style={styles.submitText}>Lưu</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default EditScreen;
