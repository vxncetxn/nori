import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { FontAwesome } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";

import { IdentityContext, DataContext } from "../Context";

import Badge from "../components/Badge";

const Message = styled.TouchableOpacity`
  background-color: ${props => props.theme.colorBgCard};
  padding: 10px;
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
`;

const MessageBadgeRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
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
        return props.theme.colorAccent;
    }
  }};
  margin-right: 10px;
  margin-bottom: 10px;
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
  const identity = useContext(IdentityContext);
  const { messages } = useContext(DataContext);
  const { target, type, title, response, publisher, recipients } = datum;
  const theme = useContext(ThemeContext);

  // let childrenBadgesPresent;
  // let classBadgesPresent;
  let responseAlertPresent;
  let responseAlertString;
  let responseCounterPresent;
  if (identity.status === "parent") {
    responseCounterPresent = false;
    // classBadgesPresent = false;

    if (response.responded) {
      responseAlertPresent = false;
      responseAlertString = "";
    } else {
      if (response.type === "acknowledgement") {
        responseAlertPresent = true;
        responseAlertString = "Acknowledgement Required";
      } else if (response.type === "consent") {
        responseAlertPresent = true;
        responseAlertString = "Consent Required";
      } else {
        responseAlertPresent = false;
        responseAlertString = "";
      }
    }

    // if (identity.children.length > 1) {
    //   childrenBadgesPresent = true;
    // } else {
    //   childrenBadgesPresent = false;
    // }
  } else {
    // childrenBadgesPresent = false;
    // classBadgesPresent = true;
    responseAlertPresent = false;
    responseAlertString = "";

    if (identity.id === "awolLVcPcd64t8zEjLa9") {
      if (response.type) {
        responseCounterPresent = true;
      } else {
        responseCounterPresent = false;
      }
    } else {
      responseCounterPresent = false;
    }
  }

  return (
    <Message onPress={onPress} {...others}>
      <MessageBadgeRow horizontal={true} showsHorizontalScrollIndicator={false}>
        <MessageTypeBadge type={type}>{type}</MessageTypeBadge>
        {/* {childrenBadgesPresent &&
          identity.children.map(child => {
            if (recipients.includes(child.class)) {
              return (
                <MessageTypeBadge type="Others">
                  {child.referredName}
                </MessageTypeBadge>
              );
            } else {
              return null;
            }
          })} */}
        {/* {classBadgesPresent && recipients.map(d => {
          return <MessageTypeBadge type="Others"></MessageTypeBadge>
        })} */}
      </MessageBadgeRow>
      <MessageTitle>{title}</MessageTitle>
      {target.dateType === "occurence" ? (
        <MessageDate>
          Happening {formatDistanceToNow(new Date(target.date))} later
        </MessageDate>
      ) : target.dateType === "deadline" ? (
        <MessageDate>
          Due {formatDistanceToNow(new Date(target.date))} later
        </MessageDate>
      ) : null}
      {responseAlertPresent && (
        <MessageAction>
          <FontAwesome name="exclamation" size={12} color={theme.colorAccent} />{" "}
          {responseAlertString}
        </MessageAction>
      )}
      {responseCounterPresent && (
        <MessageAction>
          {Object.values(response.responded).filter(d => d).length}/
          {Object.values(response.responded).length} Responded
        </MessageAction>
      )}
    </Message>
  );
};

export default MessageComp;
