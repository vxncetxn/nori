import React from "react";
import styled from "styled-components";
import { Dimensions } from "react-native";

import MasonryGrid from "../components/MasonryGrid";
import Happening from "../components/Happening";
import ImageTint from "../components/ImageTint";

import { SimpleLineIcons } from "@expo/vector-icons";

const Happenings = styled.ScrollView`
  background-color: ${props => props.theme.colorBg};
  height: auto;
`;

const Hero = styled.ImageBackground`
  flex-direction: row;
  height: 205px;
  height: ${Dimensions.get("window").height * 0.4}px;
  background-color: ${props => props.theme.colorAccent};
  border-bottom-right-radius: 50px;
  padding: 40px 20px 20px 20px;
`;

const HeroImage = styled.Image`
  position: absolute;
  right: -15%;
  bottom: 0;
  width: 100%;
  height: ${Dimensions.get("window").height * 0.4}px;
`;

const HeroContent = styled.View`
  width: 60%;
`;

const HeroTitle = styled.Text`
  font-family: "${props => props.theme.fontPrimary}";
  font-size: 42px;
  color: ${props => props.theme.colorWhite};
  margin-bottom: auto;
`;

const Tools = styled.View`
  height: 50%;
  justify-content: flex-end;
`;

const SearchBarWrapper = styled.View`
  width: 100%;
  margin-bottom: 20px;
`;

const SearchBarIcon = styled(SimpleLineIcons)`
  position: absolute;
  left: 15px;
  top: 10px;
`;

const SearchBar = styled.TextInput`
  width: 100%;
  background-color: ${props => props.theme.colorWhite};
  border-radius: 10px;
  padding: 10px 35px;
  font-family: "${props => props.theme.fontSecondary}";
  font-size: 14px;
`;

const ButtonsRow = styled.View`
  flex-direction: row;
`;

const Button = styled.TouchableOpacity`
  padding: 2.5px 15px;
  border: 1px solid ${props => props.theme.colorWhite};
  border-radius: 8px;
`;

const ButtonLabel = styled.Text`
  font-family: "${props => props.theme.fontSecondary}";
  font-size: 14px;
  color: ${props => props.theme.colorWhite};
`;

const data = [
  {
    createdDate: new Date(2020, 2, 9),
    title: "Sunday soccer",
    type: "In-class",
    pictures: [
      require("../../assets/images/happenings-stock-three.jpg"),
      require("../../assets/images/happenings-stock-four.jpg")
    ],
    publisher: {
      publisherName: "Mdm Teo",
      publisherPic: require("../../assets/images/profile-stock-three.jpg")
    }
  },
  {
    createdDate: new Date(2020, 2, 5),
    title: "Last Sunday painting workshop",
    type: "Weekly",
    pictures: [require("../../assets/images/happenings-stock-one.jpg")],
    publisher: {
      publisherName: "Ms Chen",
      publisherPic: require("../../assets/images/profile-stock-one.jpg")
    }
  },
  {
    createdDate: new Date(2020, 1, 25),
    title: "Some great pictures from Zoo trip on 22nd February",
    type: "Event",
    pictures: [require("../../assets/images/happenings-stock-two.jpg")],
    publisher: {
      publisherName: "Mr Lim",
      publisherPic: require("../../assets/images/profile-stock-two.jpg")
    }
  }
];

const HappeningsScreen = ({ navigation }) => {
  return (
    <Happenings showsVerticalScrollIndicator={false}>
      <Hero>
        <HeroImage
          source={require("../../assets/images/happenings-hero.png")}
        />
        <ImageTint />
        <HeroContent>
          <HeroTitle>Activities</HeroTitle>
          <Tools>
            <SearchBarWrapper>
              <SearchBar placeholder="Search" placeholderTextColor="#bfbfbf" />
              <SearchBarIcon name="magnifier" size={15} color={"grey"} />
            </SearchBarWrapper>
            <ButtonsRow>
              <Button>
                <ButtonLabel>Organise</ButtonLabel>
              </Button>
              <Button style={{ marginLeft: 10 }}>
                <ButtonLabel>Publish</ButtonLabel>
              </Button>
            </ButtonsRow>
          </Tools>
        </HeroContent>
      </Hero>
      <MasonryGrid
        style={{ paddingRight: 20, paddingBottom: 20, paddingLeft: 20 }}
        cols={2}
        gap={20}
        data={data}
        childGenFunc={d => (
          <Happening
            key={d.title}
            onPress={() =>
              navigation.navigate("HappeningsEntry", {
                ...d,
                createdDate: JSON.stringify(d.createdDate)
              })
            }
            datum={d}
          />
        )}
      />
    </Happenings>
  );
};

export default HappeningsScreen;
