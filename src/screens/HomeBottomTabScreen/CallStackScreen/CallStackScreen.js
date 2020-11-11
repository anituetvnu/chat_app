import React, {Component} from "react";
import {Text, View} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "./HomeScreen/HomeScreen";
import CallScreen from "./CallScreen/CallScreen";

const Stack = createStackNavigator();

const CallStackScreen = ({navigation, route}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" Component={HomeScreen} />
      <Stack.Screen name="Call" Component={CallScreen} />
    </Stack.Navigator>
  );
};

export default CallStackScreen;
