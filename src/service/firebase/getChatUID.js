import database from '@react-native-firebase/database';
const getChatUID = async (ID1, ID2) => {
  // console.log('get chatUID');
  var chatUID = null;
  await database()
    .ref(`Chats/`)
    .once('value', (snap) => {
      // console.log('snap :', snap.val());
      const obj = snap.val();
      if (!obj) return null;
      const keys = Object.keys(obj);
      keys.forEach((key) => {
        const temp = [obj[key][0], obj[key][1]];
        // console.log(temp);
        if (
          JSON.stringify(temp) == JSON.stringify([ID2, ID1]) ||
          JSON.stringify(temp) == JSON.stringify([ID1, ID2])
        ) {
          chatUID = key;
        }
      });
    });
  return chatUID;
};

export {getChatUID};
