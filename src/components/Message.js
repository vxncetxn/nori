import React from "react";
import styled from "styled-components";
import { FontAwesome } from "@expo/vector-icons";

import Constants from "../Constants";

import Badge from "../components/Badge";

const Message = styled.View`
  background-color: ${props =>
    props.highlight ? Constants.colorBgLighter : Constants.colorBgLighter};
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
  color: white;
  font-size: 20px;
  font-family: "${Constants.fontPrimary}";
  margin-bottom: 20px;
`;

const MessageDate = styled.Text`
  color: white;
  font-size: 14px;
  font-family: "${Constants.fontSecondary}";
`;

const MessageAction = styled.Text`
  font-size: 14px;
  font-family: "${Constants.fontSecondary}";
  color: ${Constants.colorAccent};
  margin-top: 10px;
`;

const MessageComp = ({
  title,
  type,
  acknowledgementRequired,
  consentRequired
}) => {
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
          <FontAwesome
            name="exclamation"
            size={11}
            color={Constants.colorAccent}
          />{" "}
          Acknowledgement Required
        </MessageAction>
      )}
      {consentRequired && (
        <MessageAction>
          <FontAwesome
            name="exclamation"
            size={12}
            color={Constants.colorAccent}
          />{" "}
          Consent Required
        </MessageAction>
      )}
    </Message>
  );
};

export default MessageComp;
