import React from "react";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";
import { formatDistanceToNow } from "date-fns";

import Badge from "../components/Badge";

const HappeningButton = styled.TouchableOpacity``;

const Happening = styled.ImageBackground`
  background-color: ${props =>
    props.highlight ? props.theme.colorBgCard : props.theme.colorBgCard};
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
  padding: 100px 10px 10px 10px;
`;

const ImageTint = styled(LinearGradient)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const HappeningBadgeRow = styled.ScrollView`
  flex-direction: row;
  margin-bottom: 10px;
  overflow: scroll;
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

const HappeningTitle = styled.Text`
color: ${props => props.theme.colorText};
font-size: 20px;
font-family: "${props => props.theme.fontPrimary}";
margin-bottom: 20px;
`;

const HappeningDate = styled.Text`
  color: ${props => props.theme.colorText};
  font-size: 14px;
  font-family: "${props => props.theme.fontSecondary}";
`;

const HappeningComp = ({ onPress, datum, ...others }) => {
  const { createdDate, title, type, pictures } = datum;

  return (
    <HappeningButton onPress={onPress}>
      <Happening source={pictures[0]} {...others}>
        <ImageTint
          colors={["rgba(0, 0, 0, 0.1)", "rgba(0, 0, 0, 0.8)"]}
        ></ImageTint>
        <HappeningBadgeRow
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <HappeningTypeBadge type={type}>{type}</HappeningTypeBadge>
        </HappeningBadgeRow>
        <HappeningTitle>{title}</HappeningTitle>
        <HappeningDate>
          Posted {formatDistanceToNow(createdDate)} ago
        </HappeningDate>
      </Happening>
    </HappeningButton>
  );
};

export default HappeningComp;
