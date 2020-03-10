import React, { useState, useEffect } from "react";
import { Image } from "react-native";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import styled, { ThemeProvider } from "styled-components";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SimpleLineIcons, FontAwesome } from "@expo/vector-icons";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";

// import MessagesScreen from "./src/screens/MessagesScreen";
import MessagesStack from "./src/MessagesStack";
import ProgressScreen from "./src/screens/ProgressScreen";
import HappeningsScreen from "./src/screens/HappeningsScreen";
import ChatScreen from "./src/screens/ChatScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

const IconWrapper = styled.View``;

const PendingBubble = styled.Text`
  position: absolute;
  top: -5px;
  right: -8px;
  padding: 1px 3px;
  border: 1px solid ${props => props.theme.colorAccent};
  border-radius: 5px;
  overflow: hidden;
  font-family: "${props => props.theme.fontSecondary}";
  font-size: 10px;
  color: ${props => props.theme.colorAccent};
  background-color: ${props => props.theme.colorBgNav};
`;

const cacheImages = images => {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

export default function App() {
  const colorScheme = useColorScheme();
  const theme = {
    fontPrimary: "Techna Sans",
    fontSecondary: "Inter Medium",
    colorBg: colorScheme === "light" ? "#f8f4ec" : "#000000",
    colorBgNav: colorScheme === "light" ? "#f7f2e9" : "#0d0d0d",
    colorBgCard: colorScheme === "light" ? "#f4eee1" : "#141414",
    colorAccent: "#ffac00",
    colorAccentTwo: "#5900ff",
    colorText: colorScheme === "light" ? "#333333" : "#eaeaea",
    colorInactiveGrey: colorScheme === "light" ? "#cccccc" : "#333333",
    colorWhite: "#f8f4ec",
    colorGreen: "#00e639",
    colorRed: "#ff4000"
  };

  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    loadAssets = async () => {
      const loadImagesPromises = cacheImages([
        require("./assets/images/messages-hero.png"),
        require("./assets/images/progress-hero.png"),
        require("./assets/images/happenings-hero.png")
      ]);
      const loadFontsPromise = Font.loadAsync({
        "Techna Sans": require("./assets/fonts/TechnaSans-Regular.otf"),
        "Inter Regular": require("./assets/fonts/Inter-Regular.otf"),
        "Inter Medium": require("./assets/fonts/Inter-Medium.otf")
      });

      await Promise.all([...loadImagesPromises, loadFontsPromise]);

      setAssetsLoaded(true);
    };

    loadAssets();
  }, []);

  const Tab = createBottomTabNavigator();

  const pending = {
    Messages: 4,
    Progress: 0,
    Happenings: 17,
    Chat: 0,
    Settings: 0
  };

  return assetsLoaded ? (
    <ThemeProvider theme={theme}>
      <AppearanceProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                switch (route.name) {
                  case "Messages":
                    iconName = "notebook";
                    break;
                  case "Progress":
                    iconName = "chart";
                    break;
                  case "Happenings":
                    iconName = "chart";
                    break;
                  case "Chat":
                    iconName = "speech";
                    break;
                  case "Settings":
                    iconName = "settings";
                    break;
                }

                return (
                  <IconWrapper>
                    <SimpleLineIcons name={iconName} size={20} color={color} />
                    {pending[route.name] ? (
                      <PendingBubble>{pending[route.name]}</PendingBubble>
                    ) : null}
                  </IconWrapper>
                );
              }
            })}
            tabBarOptions={{
              activeTintColor: theme.colorAccent,
              inactiveTintColor: "#808080",
              style: {
                backgroundColor: theme.colorBgNav,
                borderTopColor: "transparent"
              },
              labelStyle: {
                fontFamily: theme.fontSecondary,
                fontSize: 10
              }
            }}
          >
            <Tab.Screen name="Messages" component={MessagesStack} />
            <Tab.Screen name="Progress" component={ProgressScreen} />
            <Tab.Screen name="Happenings" component={HappeningsScreen} />
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </AppearanceProvider>
    </ThemeProvider>
  ) : (
    <AppLoading />
  );
}
