import database from '@react-native-firebase/database';
export default sendMessage = async (message, userUID, chatUID) => {
  if (message == '') return '';
  const date = new Date();
  const newMessage = {
    message: message,
    time: date.getTime(),
    sentBy: userUID,
  };
  const newMessageRef = database().ref(`Messages`).push(newMessage);
  database().ref(`UsersMessages/${chatUID}`).push(newMessageRef.key);
  return '';
};
