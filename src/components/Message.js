import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { FontAwesome } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";

import Badge from "../components/Badge";

const Message = styled.TouchableOpacity`
  background-color: ${props => props.theme.colorBgCard};
  padding: 10px;
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
`;

const MessageBadgeRow = styled.ScrollView`
  flex-direction: row;
  margin-bottom: 10px;
  overflow: scroll;
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

const MessageTitle = styled.Text`
  color: ${props => props.theme.colorText};
  font-size: 20px;
  font-family: "${props => props.theme.fontPrimary}";
`;

const MessageDate = styled.Text`
  color: ${props => props.theme.colorText};
  font-size: 14px;
  font-family: "${props => props.theme.fontSecondary}";
  margin-top: 20px;
`;

const MessageAction = styled.Text`
  font-size: 14px;
  font-family: "${props => props.theme.fontSecondary}";
  color: ${props => props.theme.colorAccent};
  margin-top: 10px;
`;

const MessageComp = ({ onPress, datum, ...others }) => {
  const { targetDetails, type, title, response } = datum;
  const { targetDate, targetDateType } = targetDetails;
  const { responseType, responded } = response;
  const theme = useContext(ThemeContext);

  return (
    <Message onPress={onPress} {...others}>
      <MessageBadgeRow horizontal={true} showsHorizontalScrollIndicator={false}>
        <MessageTypeBadge type={type}>{type}</MessageTypeBadge>
        {/* <MessageTypeBadge type={type} style={{ marginLeft: 10 }}>
          {type}
        </MessageTypeBadge>
        <MessageTypeBadge type={type} style={{ marginLeft: 10 }}>
          {type}
        </MessageTypeBadge>
        <MessageTypeBadge type={type} style={{ marginLeft: 10 }}>
          {type}
        </MessageTypeBadge>
        <MessageTypeBadge type={type} style={{ marginLeft: 10 }}>
          {type}
        </MessageTypeBadge> */}
      </MessageBadgeRow>
      <MessageTitle>{title}</MessageTitle>
      {targetDateType === "occurence" ? (
        <MessageDate>
          Happening {formatDistanceToNow(targetDate)} later
        </MessageDate>
      ) : targetDateType === "deadline" ? (
        <MessageDate>Due {formatDistanceToNow(targetDate)} later</MessageDate>
      ) : null}
      {!responded &&
        (responseType === "Acknowledgement" ? (
          <MessageAction>
            <FontAwesome
              name="exclamation"
              size={12}
              color={theme.colorAccent}
            />{" "}
            Acknowledgement Required
          </MessageAction>
        ) : responseType === "Consent" ? (
          <MessageAction>
            <FontAwesome
              name="exclamation"
              size={12}
              color={theme.colorAccent}
            />{" "}
            Consent Required
          </MessageAction>
        ) : null)}
    </Message>
  );
};

export default MessageComp;
