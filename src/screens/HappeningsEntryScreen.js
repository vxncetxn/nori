import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { SimpleLineIcons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";

import Badge from "../components/Badge";
import RegText from "../components/RegText";

const HappeningsEntry = styled.ScrollView`
  background-color: ${props => props.theme.colorBg};
  height: auto;
`;

const HeroButton = styled.TouchableOpacity``;

const Hero = styled.ImageBackground`
  background-color: ${props => props.theme.colorAccent};
  border-bottom-right-radius: 50px;
  padding: 40px 20px 20px 20px;
  overflow: hidden;
`;

const ImageTint = styled(LinearGradient)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const ToolsRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 100px;
`;

const ToolButton = styled.TouchableOpacity``;

const ToolButtonCalendar = styled(ToolButton)`
  transform: translateY(-1px);
`;

const HappeningBadgeRow = styled.ScrollView`
  flex-direction: row;
  margin-bottom: 10px;
`;

const HappeningTypeBadge = styled(Badge)`
  background-color: ${props => {
    switch (props.type) {
      case "Weekly":
        return "#0080ff";
      case "Event":
        return "#ff00ff";
      case "In-class":
        return "#8000ff";
      default:
        break;
    }
  }};
`;

const HeroTitle = styled.Text`
  font-family: "${props => props.theme.fontPrimary}";
  font-size: 36px;
  color: ${props => props.theme.colorWhite};
  margin-bottom: 20px;
`;

const OtherInfoRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const PublisherImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

const OtherInfoContent = styled.View`
  justify-content: space-between;
  align-self: stretch;
`;

const PublisherText = styled.Text`
  font-family: "${props => props.theme.fontSecondary}";
  font-size: 18px;
  color: ${props => props.theme.colorWhite};
  margin-left: 20px
`;

const DateText = styled.Text`
  font-family: "${props => props.theme.fontSecondary}";
  font-size: 18px;
  color: ${props => props.theme.colorWhite};
  margin-left: 20px
`;

const MainContent = styled.View`
  padding: 40px 20px;
`;

const HappeningsEntryScreen = ({ route, navigation }) => {
  let { createdDate, title, type, pictures, publisher } = route.params;
  createdDate = JSON.parse(createdDate);
  const { publisherName, publisherPic } = publisher;

  const theme = useContext(ThemeContext);

  return (
    <HappeningsEntry>
      <HeroButton
        onPress={() => navigation.navigate("HappeningsGallery", { pictures })}
      >
        <Hero source={pictures[0]}>
          <ImageTint
            colors={["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 1)"]}
          ></ImageTint>
          <ToolsRow>
            <ToolButton
              onPress={() => navigation.navigate("Happenings")}
              style={{ marginRight: "auto" }}
            >
              <SimpleLineIcons
                name="arrow-left"
                size={25}
                color={theme.colorWhite}
              />
            </ToolButton>
            <ToolButton style={{ marginRight: 20 }}>
              <SimpleLineIcons
                name="question"
                size={25}
                color={theme.colorWhite}
              />
            </ToolButton>
            <ToolButtonCalendar>
              <SimpleLineIcons
                name="calendar"
                size={25}
                color={theme.colorWhite}
              />
            </ToolButtonCalendar>
          </ToolsRow>
          <HappeningBadgeRow>
            <HappeningTypeBadge type={type}>{type}</HappeningTypeBadge>
          </HappeningBadgeRow>
          <HeroTitle>{title}</HeroTitle>
          <OtherInfoRow>
            <PublisherImage source={publisherPic} />
            <OtherInfoContent>
              <PublisherText>{publisherName}</PublisherText>
              <DateText>
                Posted {formatDistanceToNow(new Date(createdDate))} ago
              </DateText>
            </OtherInfoContent>
          </OtherInfoRow>
        </Hero>
      </HeroButton>
      <MainContent>
        <RegText>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English.
          {"\n"}
          {"\n"}
          Many desktop publishing packages and web page editors now use Lorem
          Ipsum as their default model text, and a search for 'lorem ipsum' will
          uncover many web sites still in their infancy. Various versions have
          evolved over the years, sometimes by accident, sometimes on purpose
          (injected humour and the like).
        </RegText>
      </MainContent>
    </HappeningsEntry>
  );
};

export default HappeningsEntryScreen;
