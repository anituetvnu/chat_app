import React from "react";
import {TouchableOpacity} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import Feather from "react-native-vector-icons/Feather";

import MessagesScreen from "./MessagesScreen/MessagesScreen";
import ConversationScreen from "./ConversationScreen/ConversationScreen";
import styles from "./styles";

const Stack = createStackNavigator();

const MessagesStackScreen = ({navigation, route}) => {
  return (
    <Stack.Navigator
      initialRouteName="Add"
      screenOptions={{
        headerStyle: {backgroundColor: "#2C98F0", height: 70},
      }}>
      <Stack.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          title: "Chat App",
          headerTitleAlign: "center",
          headerLeft: (props) => (
            <TouchableOpacity>
              <Feather name="menu" style={styles.navigateIcon} />
            </TouchableOpacity>
          ),
          headerRight: (props) => (
            <TouchableOpacity>
              <Feather name="search" style={styles.navigateIcon} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Conversation"
        component={ConversationScreen}
        options={{
          headerTitleAlign: "center",
          tabBarVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MessagesStackScreen;
