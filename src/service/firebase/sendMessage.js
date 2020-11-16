import database from '@react-native-firebase/database';
export default sendMessage = async (
  message,
  userUID,
  chatUID,
  image = null,
) => {
  if (!message && !image) return '';
  const date = new Date();
  const newMessage = {
    message: message,
    time: date.getTime(),
    sentBy: userUID,
  };
  if (image)
    newMessage['imageName'] = image.substring(image.lastIndexOf('%') + 1);
  const newMessageRef = database().ref(`Messages`).push(newMessage);
  database().ref(`UsersMessages/${chatUID}`).push(newMessageRef.key);
  database().ref(`Chats/${chatUID}/2`).set(newMessage);
  return '';
};
