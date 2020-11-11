import React from "react";
import {View, Text} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import AntDesign from "react-native-vector-icons/AntDesign";
import MessagesStackScreen from "./MessagesStackScreen/MessagesStackScreen";
import SearchScreen from "./SearchScreen/SearchScreen";
import CallStackScreen from "./CallStackScreen/CallStackScreen";

const Tab = createBottomTabNavigator();
const routeIcons = {
  Messages: "message1",
  Search: "earth",
};

const HomeBottomTabScreen = ({navigation, route}) => {
  return (
    <Tab.Navigator
      initialRouteName="MessagesStack"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => (
          <AntDesign
            name={routeIcons[route.name]}
            size={24}
            color={focused ? "white" : "grey"}
          />
        ),
      })}
      tabBarOptions={{
        activeTintColor: "white",
        inactiveTintColor: "grey",
        activeBackgroundColor: "#2C98F0",
        inactiveBackgroundColor: "#2C98F0",
        keyboardHidesTabBar: "true",
      }}>
      <Tab.Screen
        name="Messages"
        component={MessagesStackScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Call" component={CallStackScreen} />
      {/* <Tab.Screen name="Test" component={ TestScreen } /> */}
    </Tab.Navigator>
  );
};

export default HomeBottomTabScreen;
