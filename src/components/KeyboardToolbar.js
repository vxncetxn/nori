import React, { useEffect, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import Animated, { Easing } from "react-native-reanimated";
import { Dimensions } from "react-native";
import { TouchableOpacity, Keyboard } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { InputAccessoryView } from "react-native";
import * as ImagePicker from "expo-image-picker";

// const KeyboardToolbar = styled(Animated.View)`
//   flex-direction: row;
//   padding: 10px 20px;
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   width: ${Dimensions.get("window").width}px;
//   background-color: ${props => props.theme.colorBgCard};
//   border-top-color: ${props => props.theme.colorInactiveGrey};
//   border-top-width: 1px;
// `;

const KeyboardToolbar = styled.View`
  flex-direction: row;
  padding: 10px 20px;
  width: ${Dimensions.get("window").width}px;
  background-color: ${props => props.theme.colorBgCard};
  border-top-color: ${props => props.theme.colorInactiveGrey};
  border-top-width: 1px;
`;

const KeyboardToolbarComp = ({ nativeID, functions, ...others }) => {
  const theme = useContext(ThemeContext);

  const openCamera = async () => {
    const cameraPermissions = await ImagePicker.requestCameraPermissionsAsync();
    const cameraRollPermissions = await ImagePicker.requestCameraRollPermissionsAsync();

    if (cameraPermissions && cameraRollPermissions) {
      await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true
      });
    }
  };

  const openGallery = async () => {
    const cameraRollPermissions = await ImagePicker.requestCameraRollPermissionsAsync();

    if (cameraRollPermissions) {
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: true
      });
    }
  };

  const mapFunctions = func => {
    switch (func) {
      case "camera":
        return { iconName: "camera", action: openCamera };
      case "gallery":
        return { iconName: "picture", action: openGallery };
      case "documents":
        return { iconName: "doc", action: () => {} };
      default:
        return "";
    }
  };

  //   const yOffset = new Animated.Value(0);
  //   const opacity = new Animated.Value(0);

  //   const showToolbar = e => {
  //     Animated.timing(yOffset, {
  //       toValue: -e.startCoordinates.height,
  //       duration: 150,
  //       easing: Easing.linear
  //     }).start();
  //     Animated.timing(opacity, {
  //       toValue: 1,
  //       duration: 150,
  //       easing: Easing.linear
  //     }).start();
  //   };

  //   const hideToolbar = e => {
  //     Animated.timing(yOffset, {
  //       toValue: 0,
  //       duration: 150,
  //       easing: Easing.linear
  //     }).start();
  //     Animated.timing(opacity, {
  //       toValue: 0,
  //       duration: 150,
  //       easing: Easing.linear
  //     }).start();
  //   };

  //   useEffect(() => {
  //     Keyboard.addListener("keyboardWillShow", showToolbar);
  //     Keyboard.addListener("keyboardWillHide", hideToolbar);

  //     return () => {
  //       Keyboard.removeListener("keyboardWillShow", showToolbar);
  //       Keyboard.removeListener("keyboardWillHide", hideToolbar);
  //     };
  //   }, []);

  return (
    // <KeyboardToolbar style={{ transform: [{ translateY: yOffset }] }}>
    //   <TouchableOpacity>
    //     <SimpleLineIcons name="camera" size={20} color={theme.colorWhite} />
    //   </TouchableOpacity>
    //   <TouchableOpacity style={{ marginLeft: 20 }}>
    //     <SimpleLineIcons
    //       name="camrecorder"
    //       size={20}
    //       color={theme.colorWhite}
    //     />
    //   </TouchableOpacity>
    //   <TouchableOpacity style={{ marginLeft: 20 }}>
    //     <SimpleLineIcons name="picture" size={20} color={theme.colorWhite} />
    //   </TouchableOpacity>
    //   <TouchableOpacity style={{ marginLeft: "auto" }}>
    //     <SimpleLineIcons name="arrow-down" size={20} color={theme.colorWhite} />
    //   </TouchableOpacity>
    // </KeyboardToolbar>

    <InputAccessoryView nativeID={nativeID}>
      <KeyboardToolbar>
        {functions.map((func, idx) => {
          const { iconName, action } = mapFunctions(func);

          return (
            <TouchableOpacity
              key={func}
              style={idx > 0 ? { marginLeft: 20 } : null}
              onPress={action}
            >
              <SimpleLineIcons
                name={iconName}
                size={20}
                color={theme.colorWhite}
              />
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          style={{ marginLeft: "auto" }}
          onPress={() => Keyboard.dismiss()}
        >
          <SimpleLineIcons
            name="arrow-down"
            size={20}
            color={theme.colorWhite}
          />
        </TouchableOpacity>
      </KeyboardToolbar>
    </InputAccessoryView>
  );
};

export default KeyboardToolbarComp;
