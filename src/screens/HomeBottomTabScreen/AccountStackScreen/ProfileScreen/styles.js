import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {},
  header: {
    height: 50,
    backgroundColor: 'rgb(72, 163, 255)',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button: {
    fontSize: 24,
    color: 'white',
  },
  buttonLogOut: {
    backgroundColor: 'rgb(72, 163, 255)',
    position: 'absolute',
    marginLeft: width - 35,
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
    marginLeft: 10,
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
    marginTop: 'auto',
    flexDirection: 'row',
  },
  follow: {
    color: 'white',
    fontSize: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: 'lightblue',
  },
  sendMessage: {
    color: 'white',
    fontSize: 25,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'lightblue',
  },
  logOut: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  body: {
    marginVertical: 15,
    borderTopWidth: 8,
    borderColor: 'rgb(214, 214, 214)',
  },
  headerBody: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  avatarHeader: {
    backgroundColor: 'grey',
    width: 80,
    height: 80,
    marginBottom: 5,
    borderRadius: 100,
  },
  textInput: {
    width: width - 100,
    height: 60,
    marginLeft: 15,
    // marginRight: 15,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgb(214, 214, 214)',
    paddingVertical: 10,
  },
  chatCard: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 7,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    paddingBottom: 6,
  },
  chatAvatar: {
    width: 55,
    height: 55,
    borderRadius: 100,
  },
  chatName: {
    fontSize: 20,
    fontWeight: '300',
  },
  chatMessage: {
    fontSize: 15,
  },
  chatContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
  chatTime: {
    fontSize: 12,
    alignSelf: 'flex-end',
  },
});

export default styles;
