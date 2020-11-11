import React, {Component} from "react";
import {Text, View} from "react-native";
import {StringeeClient} from "stringee-react-native";

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
  }

  // The client connects to Stringee server
  _clientDidConnect = ({userId}) => {
    console.log("_clientDidConnect - " + userId);
  };

  // The client disconnects from Stringee server
  _clientDidDisConnect = () => {
    console.log("_clientDidDisConnect");
  };

  // The client fails to connects to Stringee server
  _clientDidFailWithError = () => {
    console.log("_clientDidFailWithError");
  };

  // Access token is expired. A new access token is required to connect to Stringee server
  _clientRequestAccessToken = () => {
    console.log("_clientRequestAccessToken");
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
      "IncomingCallId-" +
        callId +
        " from-" +
        from +
        " to-" +
        to +
        " fromAlias-" +
        fromAlias +
        " toAlias-" +
        toAlias +
        " isVideoCall-" +
        isVideoCall +
        "callType-" +
        callType,
    );
  };

  async componentDidMount() {
    await this.refs.client.connect("YOUR_ACCESS_TOKEN");
  }

  getComponent() {
    return (
      <View>
        <StringeeClient ref="client" eventHandlers={this.clientEventHandlers} />
      </View>
    );
  }

  render() {
    return (
      <View>
        <StringeeClient ref="client" eventHandlers={this.clientEventHandlers} />
      </View>
    );
  }
}

export default HomeScreen;
