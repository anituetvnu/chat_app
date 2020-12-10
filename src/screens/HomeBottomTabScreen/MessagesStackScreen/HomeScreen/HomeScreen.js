import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Keyboard,
} from 'react-native';
import {connect} from 'react-redux';
import {
  StringeeClient,
  StringeeCall,
  StringeeVideoView,
  StringeeRemoteVideoView,
} from 'stringee-react-native';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.clientEventHandlers = {
      onConnect: this._clientDidConnect,
      onDisConnect: this._clientDidDisConnect,
      onFailWithError: this._clientDidFailWithError,
      onRequestAccessToken: this._clientRequestAccessToken,
      onIncomingCall: this._callIncomingCall,
    };

    this.state = {
      myUserId: '',
      callToUserId: '',
      hasConnected: false,
    };
  }

  componentWillMount() {}

  async componentDidMount() {
    console.log(this.props.route.params.name);
    const {name} = this.props.route.params;
    const url = 'https://get-access-token-api.herokuapp.com/?userid=' + name;
    console.log(url);
    // console.log('user', user);
    await fetch(url)
      .then((response) => response.json())
      .then(async (data) => {
        await this.refs.client.connect(data.token);
        console.log(data);
      });
    // this.props.navigation.getParam('access_token'),
    // console.log(this.props.route.params);
  }

  // IncomingCall event
  _callIncomingCall = ({
    callId,
    from,
    to,
    fromAlias,
    toAlias,
    callType,
    isVideoCall,
  }) => {
    console.log(
      'IncomingCallId-' +
        callId +
        ' from-' +
        from +
        ' to-' +
        to +
        ' fromAlias-' +
        fromAlias +
        ' toAlias-' +
        toAlias +
        ' isVideoCall-' +
        isVideoCall +
        'callType-' +
        callType,
    );
  };

  // The client connects to Stringee server
  _clientDidConnect = ({userId}) => {
    console.log('_clientDidConnect - ' + userId);
    this.setState({
      myUserId: userId,
      hasConnected: true,
    });
  };

  // The client disconnects from Stringee server
  _clientDidDisConnect = () => {
    console.log('_clientDidDisConnect');
    this.setState({
      myUserId: '',
      hasConnected: false,
    });
  };

  // The client fails to connects to Stringee server
  _clientDidFailWithError = () => {
    console.log('_clientDidFailWithError');
  };

  // Access token is expired. A new access token is required to connect to Stringee server
  _clientRequestAccessToken = () => {
    console.log('_clientRequestAccessToken');
    // this.refs.client.connect('NEW_YOUR_ACCESS_TOKEN');
  };

  // IncomingCall event
  _callIncomingCall = ({
    callId,
    from,
    to,
    fromAlias,
    toAlias,
    callType,
    isVideoCall,
  }) => {
    console.log(
      'IncomingCallId-' +
        callId +
        ' from-' +
        from +
        ' to-' +
        to +
        ' fromAlias-' +
        fromAlias +
        ' toAlias-' +
        toAlias +
        ' isVideoCall-' +
        isVideoCall +
        'callType-' +
        callType,
    );
    this.props.navigation.navigate('Call', {
      callId: callId,
      from: from,
      to: to,
      isOutgoingCall: false,
      isVideoCall: isVideoCall,
    });
  };

  // Action
  _onVoiceCallButtonPress = () => {
    console.log('_onVoiceCallButtonPress');
    Keyboard.dismiss();
    if (this.state.callToUserId != '' && this.state.hasConnected) {
      this.props.navigation.navigate('Call', {
        from: this.state.myUserId,
        to: this.state.callToUserId,
        isOutgoingCall: true,
        isVideoCall: false,
      });
    }
  };

  _onVideoCallButtonPress = () => {
    Keyboard.dismiss();
    console.log('_onVideoCallButtonPress');
    if (this.state.callToUserId != '' && this.state.hasConnected) {
      this.props.navigation.navigate('Call', {
        from: this.state.myUserId,
        to: this.state.callToUserId,
        isOutgoingCall: true,
        isVideoCall: true,
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.welcome}>
          React Native wrapper for Stringee mobile SDK!
        </Text> */}

        <Text style={styles.info}>Logged in as: {this.state.myUserId}</Text>

        <TextInput
          underlineColorAndroid="transparent"
          style={styles.input}
          autoCapitalize="none"
          value={this.state.callToUserId}
          placeholder="Make a call to userId"
          onChangeText={(text) => this.setState({callToUserId: text})}
        />

        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onVoiceCallButtonPress}>
            <Text style={styles.text}>Voice Call</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={this._onVideoCallButtonPress}>
            <Text style={styles.text}>Video Call</Text>
          </TouchableOpacity>
        </View>

        <StringeeClient ref="client" eventHandlers={this.clientEventHandlers} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    color: 'red',
  },
  text: {
    textAlign: 'center',
    color: '#F5FCFF',
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 15,
  },

  input: {
    height: 35,
    width: 280,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    textAlign: 'center',
    backgroundColor: '#ECECEC',
  },

  button: {
    width: 120,
    height: 40,
    marginTop: 40,
    paddingTop: 10,
    // paddingBottom: ,
    backgroundColor: '#1E6738',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },

  buttonView: {
    width: 280,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
