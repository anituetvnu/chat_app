import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {},
  navigate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  icons: {
    fontSize: 30,
    color: 'black',
  },
  avatarWrapper: {
    flexDirection: 'row',
    margin: 15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginHorizontal: 10,
  },
  userInfo: {
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'rgb(39,51,80)',
  },
  userJob: {
    fontSize: 20,
    color: 'rgb(168,172,195)',
  },
  followAndSend: {
    flexDirection: 'row',
  },
  follow: {
    color: 'white',
    fontSize: 20,
    margin: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: 'lightblue',
  },
  sendMessage: {
    color: 'white',
    fontSize: 26,
    margin: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: 'lightblue',
  },
  box: {flex: 1},
  infoCounter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  number: {
    fontSize: 25,
    fontWeight: '200',
    textAlign: 'center',
  },
  content: {
    color: 'grey',
    textAlign: 'center',
  },
  photos: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  logOut: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLogOut: {
    borderRadius: 10,
    width: 0.6 * width,
    height: 0.05 * height,
    backgroundColor: 'rgb(72, 163, 255)',
  },
});

export default styles;
