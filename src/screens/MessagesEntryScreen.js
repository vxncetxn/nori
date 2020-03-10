import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { SimpleLineIcons, FontAwesome } from "@expo/vector-icons";
import { format, formatDistanceToNow } from "date-fns";

import Badge from "../components/Badge";

const MessagesEntry = styled.ScrollView`
  background-color: ${props => props.theme.colorBg};
  height: auto;
`;

const Hero = styled.View`
  background-color: ${props => props.theme.colorAccent};
  border-bottom-right-radius: 50px;
  padding: 40px 20px 20px 20px;
`;

const ToolsRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const ToolButton = styled.TouchableOpacity``;

const ToolButtonCalendar = styled(ToolButton)`
  transform: translateY(-1px);
`;

const MessageBadgeRow = styled.ScrollView`
  flex-direction: row;
  margin-bottom: 10px;
`;

const MessageTypeBadge = styled(Badge)`
  background-color: ${props => {
    switch (props.type) {
      case "Notice":
        return "#0080ff";
      case "Event":
        return "#ff00ff";
      case "Admin":
        return "#8000ff";
      default:
        break;
    }
  }};
`;

const HeroTitle = styled.Text`
  font-family: "${props => props.theme.fontPrimary}";
  font-size: 36px;
  color: ${props => props.theme.colorBg};
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
  color: ${props => props.theme.colorBg};
  margin-left: 20px
`;

const DateText = styled.Text`
  font-family: "${props => props.theme.fontSecondary}";
  font-size: 18px;
  color: ${props => props.theme.colorBg};
  margin-left: 20px
`;

const MainContent = styled.View`
  padding: 40px 20px 60px 20px;
`;

const ResponseAlert = styled.Text`
  font-size: 16px;
  font-family: "${props => props.theme.fontSecondary}";
  color: ${props => props.theme.colorAccent};
  margin-bottom: 20px;
`;

const DetailsText = styled.Text`
  color: ${props => props.theme.colorText};
  font-size: 16px;
  font-family: "${props => props.theme.fontSecondary}";
  line-height: 30px;
  margin-bottom: 60px;
`;

const ResponseButton = styled.TouchableOpacity`
  margin: 0 auto;
  padding: 10px 50px;
  border-radius: 8px;
  background-color: ${props => {
    switch (props.responseButtonStatus) {
      case "pending":
        return props.theme.colorAccent;
      case "complete":
        return props.theme.colorGreen;
      case "inactive":
        return props.theme.colorInactiveGrey;
      default:
        return props.theme.colorInactiveGrey;
    }
  }};
`;

const ResponseButtonLabel = styled.Text`
  font-family: "${props => props.theme.fontPrimary}";
  font-size: 24px;
  color: ${props => props.theme.colorBg};
`;

const MessagesEntryScreen = ({ route, navigation }) => {
  let {
    createdDate,
    targetDate,
    type,
    title,
    publisher,
    response
  } = route.params;
  createdDate = JSON.parse(createdDate);
  targetDate = JSON.parse(targetDate);
  const { publisherName, publisherPic } = publisher;
  const { responseType, deadline, responded } = JSON.parse(response);

  let responseAlertPresent;
  let responseAlertString;
  let responseButtonStatus;
  let responseButtonLabelString;
  if (responded) {
    if (responseType === "Acknowledgement") {
      responseAlertPresent = false;
      responseAlertString = "";
      responseButtonStatus = "complete";
      responseButtonLabelString = "Acknowledged";
    } else if (responseType === "Consent") {
      responseAlertPresent = false;
      responseAlertString = "";
      responseButtonStatus = "complete";
      responseButtonLabelString = "Consent Given";
    }
  } else {
    if (responseType === "Acknowledgement") {
      responseAlertPresent = true;
      responseAlertString = `You have to acknowledge by ${format(
        new Date(deadline),
        "do LLLL yyyy"
      )}`;
      responseButtonStatus = "pending";
      responseButtonLabelString = "Acknowledge";
    } else if (responseType === "Consent") {
      responseAlertPresent = true;
      responseAlertString = `You have to give consent by ${format(
        new Date(deadline),
        "do LLLL yyyy"
      )}`;
      responseButtonStatus = "pending";
      responseButtonLabelString = "Give Consent";
    } else {
      responseAlertPresent = false;
      responseAlertString = "";
      responseButtonStatus = "inactive";
      responseButtonLabelString = "No Response Required";
    }
  }

  const theme = useContext(ThemeContext);

  return (
    <MessagesEntry>
      <Hero>
        <ToolsRow>
          <ToolButton
            onPress={() => navigation.navigate("Messages")}
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
        <MessageBadgeRow>
          <MessageTypeBadge type={type}>{type}</MessageTypeBadge>
        </MessageBadgeRow>
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
      <MainContent>
        {responseAlertPresent ? (
          <ResponseAlert>
            <FontAwesome
              name="exclamation"
              size={15}
              color={theme.colorAccent}
            />{" "}
            {responseAlertString}
          </ResponseAlert>
        ) : null}
        <DetailsText>
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
        </DetailsText>
        <ResponseButton
          disabled={responseType ? false : true}
          responseButtonStatus={responseButtonStatus}
        >
          <ResponseButtonLabel>{responseButtonLabelString}</ResponseButtonLabel>
        </ResponseButton>
      </MainContent>
    </MessagesEntry>
  );
};

export default MessagesEntryScreen;
