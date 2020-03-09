import React from "react";
import styled from "styled-components";

import Constants from "../Constants";

import Badge from "../components/Badge";

const Happening = styled.View`
  background-color: ${props =>
    props.highlight ? Constants.colorBgLighter : Constants.colorBgLighter};
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
`;

const HappeningImage = styled.Image`
  width: 100%;
  height: 150px;
`;

const HappeningContent = styled.View`
  padding: 10px;
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
color: white;
font-size: 20px;
font-family: "${Constants.fontPrimary}";
margin-bottom: 20px;
`;

const HappeningDate = styled.Text`
  color: white;
  font-size: 14px;
  font-family: "${Constants.fontSecondary}";
`;

const HappeningComp = ({ title, type, cover }) => {
  return (
    <Happening>
      <HappeningImage source={cover} />
      <HappeningContent>
        <HappeningBadgeRow
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <HappeningTypeBadge type={type}>{type}</HappeningTypeBadge>
        </HappeningBadgeRow>
        <HappeningTitle>{title}</HappeningTitle>
        <HappeningDate>Posted 2 days ago</HappeningDate>
      </HappeningContent>
    </Happening>
  );
};

export default HappeningComp;
