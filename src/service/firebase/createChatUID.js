import database from '@react-native-firebase/database';
const createChatUID = async (ID1, ID2) => {
  const chatRef = database().ref('Chats').push({
    0: ID1,
    1: ID2,
  });
  return chatRef.key;
};

export {createChatUID};
