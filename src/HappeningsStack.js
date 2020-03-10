import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HappeningsScreen from "./screens/HappeningsScreen";
import HappeningsEntryScreen from "./screens/HappeningsEntryScreen";
import HappeningsGalleryScreen from "./screens/HappeningsGalleryScreen";

const Stack = createStackNavigator();

const HappeningsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Happenings" component={HappeningsScreen} />
      <Stack.Screen name="HappeningsEntry" component={HappeningsEntryScreen} />
      <Stack.Screen
        name="HappeningsGallery"
        component={HappeningsGalleryScreen}
      />
    </Stack.Navigator>
  );
};

export default HappeningsStack;
