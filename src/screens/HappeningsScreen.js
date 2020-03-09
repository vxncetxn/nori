import React from "react";
import styled from "styled-components";
import { Dimensions } from "react-native";

import Constants from "../Constants";

import MasonryGrid from "../components/MasonryGrid";
import Happening from "../components/Happening";

import { SimpleLineIcons } from "@expo/vector-icons";

const Happenings = styled.ScrollView`
  background-color: ${Constants.colorBg};
  height: auto;
`;

const Hero = styled.View`
  flex-direction: row;
  height: 205px;
  height: ${Dimensions.get("window").height * 0.3}px;
  background-color: ${Constants.colorAccent};
  border-bottom-right-radius: 50px;
  padding: 40px 20px 20px 20px;
`;

const HeroContent = styled.View`
  width: 60%;
`;

const HeroImage = styled.Image`
  position: absolute;
  right: -5%;
  top: 0;
  width: 80%;
  height: ${Dimensions.get("window").height * 0.3}px;
`;

const HeroTitle = styled.Text`
  font-family: "${Constants.fontPrimary}";
  font-size: 36px;
  color: ${Constants.colorBg};
  margin-bottom: auto;
`;

const Tools = styled.View`
  height: 50%;
  justify-content: space-between;
`;

const SearchBarWrapper = styled.View`
  width: 100%;
`;

const SearchBarIcon = styled(SimpleLineIcons)`
  position: absolute;
  left: 15px;
  top: 10px;
`;

const SearchBar = styled.TextInput`
  width: 100%;
  background-color: white;
  border-radius: 10px;
  padding: 10px 35px;
  font-family: "${Constants.fontSecondary}";
  font-size: 14px;
`;

const ButtonsRow = styled.View`
  flex-direction: row;
`;

const Button = styled.TouchableOpacity`
  padding: 2.5px 15px;
  border: 1px solid white;
  border-radius: 8px;
`;

const ButtonLabel = styled.Text`
  font-family: "${Constants.fontSecondary}";
  font-size: 14px;
  color: white;
`;

const data = [
  {
    createdDate: new Date(),
    title: "Last Sunday painting workshop",
    type: "Weekly",
    pictures: [require("../../assets/images/happenings-stock-one.jpg")]
  },
  {
    createdDate: new Date(),
    title: "Some great pictures from Zoo trip on 22nd February",
    type: "Event",
    pictures: [require("../../assets/images/happenings-stock-two.jpg")]
  },
  {
    createdDate: new Date(),
    title: "Sunday soccer",
    type: "In-class",
    pictures: [require("../../assets/images/happenings-stock-three.jpg")]
  }
];

const HappeningsScreen = () => {
  return (
    <Happenings showsVerticalScrollIndicator={false}>
      <Hero>
        <HeroImage
          source={require("../../assets/images/happenings-hero.png")}
        />
        <HeroContent>
          <HeroTitle>Happenings</HeroTitle>
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
        renderItem={({ item }) => (
          <Happening
            title={item.title}
            type={item.type}
            cover={item.pictures[0]}
          />
        )}
        keyExtractor={item => item.title}
      />
    </Happenings>
  );
};

export default HappeningsScreen;
