import database from '@react-native-firebase/database';
const getChatUID = async (ID1, ID2) => {
  var chatUID = null;
  await database()
    .ref(`Chats/`)
    .once('value', (snap) => {
      const obj = snap.val();
      if (!obj) return null;
      const keys = Object.keys(obj);
      keys.forEach((key) => {
        if (
          JSON.stringify(obj[key]) == JSON.stringify([ID2, ID1]) ||
          JSON.stringify(obj[key]) == JSON.stringify([ID1, ID2])
        ) {
          chatUID = key;
        }
      });
    });
  return chatUID;
};

export {getChatUID};
