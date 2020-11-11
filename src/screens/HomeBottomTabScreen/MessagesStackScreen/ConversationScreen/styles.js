import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  inputArea: {
    height: 40,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    fontSize: 20,
    padding: 5,
  },
  linkButton: {
    fontSize: 32,
    padding: 5,
  },
  conversationArea: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  message2: {
    maxWidth: '80%',
    textAlign: 'right',
    backgroundColor: 'lightblue',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    padding: 10,
    margin: 5,
    alignSelf: 'flex-end',
  },
  message1: {
    maxWidth: '80%',
    textAlign: 'left',
    backgroundColor: 'lightblue',
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    margin: 5,
    alignSelf: 'flex-start',
  },
  images: {
    width: 100,
    height: 100,
  },
});

export default styles;
