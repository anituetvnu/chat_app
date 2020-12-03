import {StyleSheet} from 'react-native';

// textInput rgb(233, 233, 233)
// button rgb(72, 163, 255)
// message rgb(61, 190, 255)

const message = 'rgb(103, 204, 255)';
const button = 'rgb(72, 163, 255)';
const textInput = 'rgb(233, 233, 233)';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  inputArea: {
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingVertical: 5,
    marginTop: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 20,
    paddingLeft: 10,
    paddingBottom: 7,
    backgroundColor: textInput,
    borderRadius: 20,
  },
  linkButton: {
    fontSize: 36,
    color: button,
    marginHorizontal: 10,
  },
  conversationArea: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  message2: {
    maxWidth: '80%',
    textAlign: 'right',
    backgroundColor: message,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginVertical: 1,
    marginHorizontal: 5,
    alignSelf: 'flex-end',
    fontSize: 20,
  },
  message1: {
    maxWidth: '80%',
    textAlign: 'left',
    backgroundColor: message,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginVertical: 1,
    marginHorizontal: 5,
    alignSelf: 'flex-start',
    fontSize: 20,
  },
  images: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: 'black',
  },
  avatarImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  images1: {
    width: 100,
    height: 100,
  },
  images2: {
    width: 100,
    height: 100,
  },
});

export default styles;
