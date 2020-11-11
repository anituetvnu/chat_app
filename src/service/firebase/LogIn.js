import auth from '@react-native-firebase/auth';
const LogIn = async (email, password) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      const uid = response.user.uid;
      const usersRef = firebase.firestore().collection('users');
      usersRef
        .doc(uid)
        .get()
        .then((firestoreDocument) => {
          if (!firestoreDocument.exists) {
            alert('User does not exist anymore.');
            return;
          }
          const user = firestoreDocument.data();
          const action = logInUser(user);
        })
        .catch((error) => {
          alert(error);
        });
    });
};
export {};
