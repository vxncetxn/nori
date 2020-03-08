import React from "react";
import styled from "styled-components";
import { Dimensions } from "react-native";

import Constants from "../Constants";

import MasonryGrid from "../components/MasonryGrid";
import Message from "../components/Message";

import { SimpleLineIcons } from "@expo/vector-icons";

const Messages = styled.ScrollView`
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
  width: 55%;
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
    type: "Notice",
    title: "School cancelled on 21st March for spring cleaning",
    acknowledgementRequired: true,
    consentRequired: false
  },
  {
    createdDate: new Date(),
    type: "Event",
    title: "Excursion to East Coast Beach on 4th April 2020",
    acknowledgementRequired: false,
    consentRequired: true
  },
  {
    createdDate: new Date(),
    type: "Notice",
    title:
      "Excursion to Singapore Zoo on 15th March 2020 cancelled due to COVID-19",
    acknowledgementRequired: false,
    consentRequired: false
  },
  {
    createdDate: new Date(),
    type: "Notice",
    title: "Sign up for Art-4-Good Competition",
    acknowledgementRequired: false,
    consentRequired: false
  },
  {
    createdDate: new Date(),
    type: "Event",
    title: "Learning journey to Singapore Origami Center",
    acknowledgementRequired: false,
    consentRequired: true
  },
  {
    createdDate: new Date(),
    type: "Admin",
    title: "School fees for March 2020",
    acknowledgementRequired: true,
    consentRequired: false
  }
];

const MessagesScreen = () => {
  return (
    <Messages showsVerticalScrollIndicator={false}>
      <Hero>
        <HeroImage source={require("../../assets/images/messages-hero.png")} />
        <HeroContent>
          <HeroTitle>Messages</HeroTitle>
          <Tools>
            <SearchBarWrapper>
              <SearchBar placeholder="Search" placeholderTextColor="#bfbfbf" />
              <SearchBarIcon name="magnifier" size={15} color={"grey"} />
            </SearchBarWrapper>
            <ButtonsRow>
              <Button>
                <ButtonLabel>Filters</ButtonLabel>
              </Button>
              <Button style={{ marginLeft: 10 }}>
                <ButtonLabel>Add</ButtonLabel>
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
          <Message
            title={item.title}
            type={item.type}
            acknowledgementRequired={item.acknowledgementRequired}
            consentRequired={item.consentRequired}
          />
        )}
        keyExtractor={item => item.title}
      />
    </Messages>
  );
};

export default MessagesScreen;
