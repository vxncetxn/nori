import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import styled from "styled-components";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Constants from "./src/Constants";

import MessagesScreen from "./src/screens/MessagesScreen";
import ProgressScreen from "./src/screens/ProgressScreen";
import HappeningsScreen from "./src/screens/HappeningsScreen";
import ChatScreen from "./src/screens/ChatScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

import { SimpleLineIcons } from "@expo/vector-icons";

const IconWrapper = styled.View``;

const PendingBubble = styled.Text`
  position: absolute;
  top: -5px;
  right: -8px;
  padding: 1px 3px;
  border: 1px solid ${Constants.colorAccent};
  border-radius: 5px;
  overflow: hidden;
  font-family: "${Constants.fontSecondary}";
  font-size: 10px;
  color: ${Constants.colorAccent};
  background-color: ${Constants.colorBgLight};
`;

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Techna Sans": require("./assets/fonts/TechnaSans-Regular.otf"),
        "Inter Regular": require("./assets/fonts/Inter-Regular.otf"),
        "Inter Bold": require("./assets/fonts/Inter-Bold.otf")
      });
      setFontLoaded(true);
    }
    loadFonts();
  }, []);

  const Tab = createBottomTabNavigator();

  const pending = {
    Messages: 4,
    Progress: 0,
    Happenings: 17,
    Chat: 0,
    Settings: 0
  };

  return (
    // <Container>
    //   <Hero>
    //     <HeroTopBar>
    //       <HeroTitle>Announcements</HeroTitle>
    //     </HeroTopBar>
    //     <HeroMainBar>
    //       <ToolsView>
    //         <SearchBar placeholder="Search" />
    //         <ButtonsView>
    //           <ToolsButton>
    //             <Text
    //               style={{
    //                 fontFamily: "Techna Sans",
    //                 color: "grey",
    //                 fontSize: "16px"
    //               }}
    //             >
    //               Filters
    //             </Text>
    //           </ToolsButton>
    //           <ToolsButton style={{ marginLeft: 10 }}>
    //             <Text
    //               style={{
    //                 fontFamily: "Techna Sans",
    //                 color: "grey",
    //                 fontSize: "16px"
    //               }}
    //             >
    //               Add
    //             </Text>
    //           </ToolsButton>
    //         </ButtonsView>
    //       </ToolsView>
    //       <HeroImage
    //         resizeMode="contain"
    //         source={require("./assets/images/student-monochrome-400px.png")}
    //       />
    //     </HeroMainBar>
    //   </Hero>
    //   <ContentWrapper>
    //     <Content></Content>
    //   </ContentWrapper>
    // </Container>
    <>
      {fontLoaded && (
        <>
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
                      <SimpleLineIcons
                        name={iconName}
                        size={20}
                        color={color}
                      />
                      {pending[route.name] ? (
                        <PendingBubble>{pending[route.name]}</PendingBubble>
                      ) : null}
                    </IconWrapper>
                  );
                }
              })}
              tabBarOptions={{
                activeTintColor: Constants.colorAccent,
                inactiveTintColor: "#999999",
                style: {
                  backgroundColor: Constants.colorBgLight,
                  borderTopColor: "transparent"
                },
                labelStyle: {
                  fontFamily: Constants.fontSecondary,
                  fontSize: 10
                }
              }}
            >
              <Tab.Screen name="Messages" component={MessagesScreen} />
              <Tab.Screen name="Progress" component={ProgressScreen} />
              <Tab.Screen name="Happenings" component={HappeningsScreen} />
              <Tab.Screen name="Chat" component={ChatScreen} />
              <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </>
      )}
    </>
  );
}
