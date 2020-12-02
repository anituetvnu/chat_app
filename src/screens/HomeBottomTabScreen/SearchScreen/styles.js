import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    // paddingLeft: 10,
  },
  chatTime: {
    // alignSelf: "",
  },
  chatAvatar: {
    width: 55,
    height: 55,
    borderRadius: 100,
  },

  header: {
    height: 50,
    backgroundColor: 'rgb(72, 163, 255)',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  iconHeader: {
    color: 'white',
    fontSize: 40,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  textInput: {
    fontSize: 20,
    width: 0.9 * width,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: 'white',
  },
});

export default styles;
