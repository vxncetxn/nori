import React from "react";
import styled from "styled-components";

const Progress = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colorBg};
  justify-content: center;
  align-items: center;
`;

const HeroTitle = styled.Text`
  font-family: "${props => props.theme.fontPrimary}";
  font-size: 48px;
  color: ${props => props.theme.colorAccent};
`;

const ProgressScreen = () => {
  return (
    <Progress>
      <HeroTitle>Progress</HeroTitle>
    </Progress>
  );
};

export default ProgressScreen;
