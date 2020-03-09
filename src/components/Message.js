import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { FontAwesome } from "@expo/vector-icons";

import Badge from "../components/Badge";

const Message = styled.View`
  background-color: ${props =>
    props.highlight ? props.theme.colorBgCard : props.theme.colorBgCard};
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
  margin-bottom: 20px;
`;

const MessageDate = styled.Text`
  color: ${props => props.theme.colorText};
  font-size: 14px;
  font-family: "${props => props.theme.fontSecondary}";
`;

const MessageAction = styled.Text`
  font-size: 14px;
  font-family: "${props => props.theme.fontSecondary}";
  color: ${props => props.theme.colorAccent};
  margin-top: 10px;
`;

const MessageComp = ({
  title,
  type,
  acknowledgementRequired,
  consentRequired
}) => {
  const theme = useContext(ThemeContext);

  return (
    <Message highlight={acknowledgementRequired || consentRequired}>
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
      <MessageDate>Posted 2 days ago</MessageDate>
      {acknowledgementRequired && (
        <MessageAction>
          <FontAwesome name="exclamation" size={11} color={theme.colorAccent} />{" "}
          Acknowledgement Required
        </MessageAction>
      )}
      {consentRequired && (
        <MessageAction>
          <FontAwesome name="exclamation" size={12} color={theme.colorAccent} />{" "}
          Consent Required
        </MessageAction>
      )}
    </Message>
  );
};

export default MessageComp;
