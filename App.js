import React, { useState, useEffect } from "react";
import { Image } from "react-native";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import styled, { ThemeProvider } from "styled-components";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { db, storage } from "./src/firebase";

import { IdentityContext, DataContext } from "./src/Context";

import MessagesStack from "./src/MessagesStack";
import ProgressScreen from "./src/screens/ProgressScreen";
import HappeningsStack from "./src//HappeningsStack";
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
  const [identity, setIdentity] = useState({
    id: "awolLVcPcd64t8zEjLa9",
    status: "parent",
    name: "Tan Xuan Rong Vance",
    referredName: "Mr Tan",
    class: ["K1A", "K2B"],
    children: [
      {
        fullName: "Jayden Tan Kai Fong",
        referredName: "Jayden",
        class: "K1A"
      },
      {
        fullName: "Kayfen Tan Kai Jing",
        referredName: "Kayfen",
        class: "K2B"
      }
    ]
  });

  const [messages, setMessages] = useState([]);
  const [messagesStatus, setMessagesStatus] = useState("fetching");
  const [teachers, setTeachers] = useState({});
  const [teachersStatus, setTeachersStatus] = useState("fetching");
  const [parents, setParents] = useState({});
  const [parentsStatus, setParentsStatus] = useState("fetching");
  const [children, setChildren] = useState({});
  const [childrenStatus, setChildrenStatus] = useState("fetching");

  useEffect(() => {
    db.collection("messages")
      .where("recipients", "array-contains-any", identity.class)
      .get()
      .then(querySnapshot => {
        const fetchedMessages = [];
        querySnapshot.forEach(doc => {
          const messageData = doc.data();
          const { createdDate, response, target } = messageData;

          fetchedMessages.push({
            ...messageData,
            id: doc.id,
            createdDate: createdDate.toDate(),
            response: {
              type: response.type,
              responded:
                identity.status === "parent"
                  ? response.responded[identity.id]
                    ? true
                    : false
                  : response.responded,
              deadline: response.deadline.toDate()
            },
            target: {
              ...target,
              date: target.date.toDate()
            }
          });
        });

        setMessages(fetchedMessages);
      })
      .catch(err => console.log("Error: ", err));

    db.collection("teachers")
      .get()
      .then(querySnapshot => {
        const teachersMap = new Map();
        querySnapshot.forEach(doc => {
          const teacherData = doc.data();

          storage
            .child(teacherData.picture)
            .getDownloadURL()
            .then(url => {
              teachersMap.set(doc.id, { ...teacherData, picture: url });
            })
            .catch(err =>
              console.log("Error in setting Teachers pictures: ", err)
            );
        });

        setTeachers(teachersMap);
        console.log(teachers.get("Bktjwa0eYtOAJzTF5jU7").picture);
      })
      .catch(err => console.log("Error in fetching Teachers: ", err));

    db.collection("parents")
      .get()
      .then(querySnapshot => {
        const parentsMap = new Map();
        querySnapshot.forEach(doc => {
          const parentsData = doc.data();

          Promise.all(
            parentsData.parents.map(parent =>
              storage.child(parent.picture).getDownloadURL()
            )
          )
            .then(urls => {
              parentsMap.set(doc.id, {
                ...parentsData,
                parents: parentsData.parents.map((parent, idx) => {
                  return {
                    ...parent,
                    picture: urls[idx]
                  };
                })
              });
            })
            .catch(err =>
              console.log("Error in setting Parents pictures: ", err)
            );
        });

        setParents(parentsMap);
      })
      .catch(err => console.log("Error in fetching Parents: ", err));

    db.collection("children")
      .get()
      .then(querySnapshot => {
        const childrenMap = new Map();
        querySnapshot.forEach(doc => {
          const childData = doc.data();

          childrenMap.set(doc.id, childData);
        });

        setChildren(childrenMap);
      })
      .catch(err => console.log("Error in fetching Children: ", err));
  }, []);

  // const colorScheme = useColorScheme();
  const colorScheme = "dark";
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
          <IdentityContext.Provider value={identity}>
            <DataContext.Provider
              value={{ messages, teachers, parents, children }}
            >
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    switch (route.name) {
                      case "Messages":
                        iconName = "notebook";
                        break;
                      case "Portfolio":
                        iconName = "chart";
                        break;
                      case "Activities":
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
                <Tab.Screen name="Portfolio" component={ProgressScreen} />
                <Tab.Screen name="Activities" component={HappeningsStack} />
                <Tab.Screen name="Chat" component={ChatScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
              </Tab.Navigator>
            </DataContext.Provider>
          </IdentityContext.Provider>
        </NavigationContainer>
      </AppearanceProvider>
    </ThemeProvider>
  ) : (
    <AppLoading />
  );
}
