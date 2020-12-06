import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
export default function RegistrationScreen({navigation}) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [register, setRegister] = useState(true);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState('');
  const [transparent, setTransparent] = useState(0.5);

  useEffect(() => {
    if (email && password && fullName && confirmPassword) {
      setRegister(false);
      setTransparent(1);
    } else {
      setRegister(true);
      setTransparent(0.5);
    }
  }, [email, password, fullName, confirmPassword]);

  const onFooterLinkPress = () => {
    navigation.navigate('Login');
  };

  const onRegisterPress = () => {
    setLoading(true);
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      setWarning("Passwords don't match.");
      setLoading(false);
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          fullName,
        };
        fetch('https://picsum.photos/200').then((response) => {
          data['avatarUrl'] = response.url;
          database().ref(`Users/${data.id}`).set(data);
        });
        navigation.navigate('Login', {data: data});
      })
      .catch((error) => {
        // alert(error);
        setWarning(String(error));
        setLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{flex: 1, width: '100%'}}
        keyboardShouldPersistTaps="always">
        <Image
          style={styles.logo}
          source={require('../../../assets/icon.png')}
        />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          disabled={register}
          style={[styles.button, {opacity: transparent}]}
          onPress={() => onRegisterPress()}>
          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <Text style={styles.buttonTitle}>Create account</Text>
          )}
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already got an account?{' '}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
        </View>
        <View style={styles.warningView}>
          <Text style={styles.warningText}>{warning}</Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
