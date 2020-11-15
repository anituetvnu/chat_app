import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigateBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'lightblue',
  },
  navigateIcon: {
    padding: 10,
    color: 'white',
    fontSize: 30,
  },
  chatList: {
    flex: 1,
    flexDirection: 'column',
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
    borderRadius: 30,
  },
  chatName: {
    fontSize: 20,
    fontWeight: 'bold',
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
    // alignSelf: "",
  },
  textInput: {
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 20,
    width: 0.8 * width,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: 'black',
  },
});

export default styles;
