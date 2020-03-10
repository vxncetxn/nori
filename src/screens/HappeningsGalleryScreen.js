import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import Gallery from "react-native-image-gallery";
import { Dimensions } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

const HappeningsGallery = styled(Gallery)`
  flex: 1;
  background-color: #000000;
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 20px;
  top: 40px;
`;

const HappeningsGalleryScreen = ({ route, navigation }) => {
  const { pictures } = route.params;

  const theme = useContext(ThemeContext);

  return (
    <>
      <HappeningsGallery
        images={pictures.map(d => {
          return {
            source: d,
            dimensions: { width: Dimensions.get("window").height }
          };
        })}
        pageMargin={20}
        onSingleTapConfirmed={() => navigation.goBack()}
      />
      <BackButton onPress={() => navigation.goBack()}>
        <SimpleLineIcons name="arrow-left" size={25} color={theme.colorWhite} />
      </BackButton>
    </>
  );
};

export default HappeningsGalleryScreen;
