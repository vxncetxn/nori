import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MessagesScreen from "./screens/MessagesScreen";
import MessagesEntryScreen from "./screens/MessagesEntryScreen";

const Stack = createStackNavigator();

const MessagesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="MessagesEntry" component={MessagesEntryScreen} />
    </Stack.Navigator>
  );
};

export default MessagesStack;
