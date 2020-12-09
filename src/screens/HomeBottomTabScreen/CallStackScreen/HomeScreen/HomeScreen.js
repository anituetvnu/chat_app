import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
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

    this.callEventHandlers = {
      onChangeSignalingState: this._callDidChangeSignalingState,
      onChangeMediaState: this._callDidChangeMediaState,
      onReceiveLocalStream: this._callDidReceiveLocalStream,
      onReceiveRemoteStream: this._callDidReceiveRemoteStream,
      onReceiveDtmfDigit: this._didReceiveDtmfDigit,
      onReceiveCallInfo: this._didReceiveCallInfo,
      onHandleOnAnotherDevice: this._didHandleOnAnotherDevice,
    };

    this.clientEventHandlers = {
      onConnect: this._clientDidConnect,
      onDisConnect: this._clientDidDisConnect,
      onFailWithError: this._clientDidFailWithError,
      onRequestAccessToken: this._clientRequestAccessToken,
      onIncomingCall: this._callIncomingCall,
    };

    this.state = {
      from: this.props.route.params.from,
      to: this.props.route.params.to,
    };
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
  };

  // The client disconnects from Stringee server
  _clientDidDisConnect = () => {
    console.log('_clientDidDisConnect');
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
  };

  async componentDidMount() {
    await this.refs.client.connect(
      // this.props.navigation.getParam('access_token'),
      this.props.route.params.access_token,
    );
    console.log(this.props.route.params);
  }

  // Invoked when the call signaling state changes
  _callDidChangeSignalingState = ({
    callId,
    code,
    reason,
    sipCode,
    sipReason,
  }) => {
    console.log(
      'callId-' +
        callId +
        'code-' +
        code +
        ' reason-' +
        reason +
        ' sipCode-' +
        sipCode +
        ' sipReason-' +
        sipReason,
    );
  };

  // Invoked when the call media state changes
  _callDidChangeMediaState = ({callId, code, description}) => {
    console.log(
      'callId-' + callId + 'code-' + code + ' description-' + description,
    );
  };

  // Invoked when the local stream is available
  _callDidReceiveLocalStream = ({callId}) => {
    console.log('_callDidReceiveLocalStream ' + callId);
    this.setState({callId: callId});
    this.setState({hasReceivedLocalStream: true});
  };
  // Invoked when the remote stream is available
  _callDidReceiveRemoteStream = ({callId}) => {
    console.log('_callDidReceiveRemoteStream ' + callId);
    this.setState({hasReceivedRemoteStream: true});
  };

  // Invoked when receives a DMTF
  _didReceiveDtmfDigit = ({callId, dtmf}) => {
    console.log('_didReceiveDtmfDigit ' + callId + '***' + dtmf);
  };

  // Invoked when receives info from other clients
  _didReceiveCallInfo = ({callId, data}) => {
    console.log('_didReceiveCallInfo ' + callId + '***' + data);
  };

  // Invoked when the call is handled on another device
  _didHandleOnAnotherDevice = ({callId, code, description}) => {
    console.log(
      '_didHandleOnAnotherDevice ' +
        callId +
        '***' +
        code +
        '***' +
        description,
    );
  };

  render() {
    return (
      <View>
        {/* <TouchableOpacity
          onPress={() => {
            this.setState({from: 'abcd', to: 'dcba'});
          }}>
          <Text>userId: abcd</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.setState({from: 'dcba', to: 'abcd'});
          }}>
          <Text>userId: dcba</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            const myObj = {
              from: this.state.from, // caller
              to: this.state.to, // callee
              isVideoCall: false, // Cuộc gọi là video call hoặc voice call
              videoResolution: 'NORMAL', // chất lượng hình ảnh 'NORMAL' hoặc 'HD'. Mặc định là 'NORMAL'.
            };

            const parameters = JSON.stringify(myObj);

            this.refs.stringeeCall.makeCall(
              parameters,
              (status, code, message, callId) => {
                console.log(
                  'status-' +
                    status +
                    ' code-' +
                    code +
                    ' message-' +
                    message +
                    'callId-' +
                    callId,
                );
                if (status) {
                  console.log('make call success');
                  // Success
                } else {
                  console.log('make call fail');
                  // Fail
                }
              },
            );
          }}>
          <Text>Make call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.refs.stringeeCall.initAnswer(
              this.state.callId,
              (status, code, message) => {
                console.log(message);
                if (status) {
                  console.log('init call success');
                  // Sucess
                } else {
                  console.log('init call fail');
                  // Fail
                }
              },
            );
          }}>
          <Text>Init answer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.refs.stringeeCall.answer(
              this.state.callId,
              (status, code, message) => {
                console.log(message);
                if (status) {
                  console.log('answer call success');
                  // Sucess
                } else {
                  console.log('answer call fail');
                  // Fail
                }
              },
            );
          }}>
          <Text>answer call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.refs.stringeeCall.hangup(
              this.state.callId,
              (status, code, message) => {
                console.log(message);
                if (status) {
                  console.log('hang up call success');

                  // Sucess
                } else {
                  console.log('hang up call fail');

                  // Fail
                }
              },
            );
          }}>
          <Text>hang up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.refs.stringeeCall.reject(
              this.state.callId,
              (status, code, message) => {
                console.log(message);
                if (status) {
                  console.log('reject call success');
                  // Sucess
                } else {
                  console.log('reject call fail');
                  // Fail
                }
              },
            );
          }}>
          <Text>reject call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            const myObj = {
              from: this.state.from, // caller
              to: this.state.to, // callee
              isVideoCall: true, // Must be true
              videoResolution: 'NORMAL', // Set video resolution: 'NORMAL', 'HD'
            };

            const parameters = JSON.stringify(myObj);

            this.refs.stringeeCall.makeCall(
              parameters,
              (status, code, message, callId) => {
                console.log(
                  'status-' +
                    status +
                    ' code-' +
                    code +
                    ' message-' +
                    message +
                    'callId-' +
                    callId,
                );
                if (status) {
                  console.log('make video call success');
                  // Sucess
                } else {
                  console.log('make video call fail');
                  // Fail
                }
              },
            );
          }}>
          <Text>make video call</Text>
        </TouchableOpacity>
        <StringeeClient ref="client" eventHandlers={this.clientEventHandlers} />
        <StringeeCall
          ref="stringeeCall"
          eventHandlers={this.callEventHandlers}
        />
        {/* {this.state.hasReceivedLocalStream && this.state.callId != '' && (
          <StringeeVideoView
            style={{backgroundColor: 'black', width: 100, height: 100}}
            callId={this.state.callId}
            streamId=""
            local={true}
            overlay={true}
          />
        )}
        {this.state.hasReceivedRemoteStream && (
          <StringeeRemoteVideoView
            style={styles.remoteView}
            callId={this.state.callId}
            streamId=""
            local={false}
          />
        )} */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  remoteView: {
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    zIndex: 0,
  },
});

export default HomeScreen;
