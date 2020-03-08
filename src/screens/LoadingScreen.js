import React, { useEffect } from "react";
import styled from "styled-components";

import Constants from "../Constants";

const Loading = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${Constants.colorAccent};
`;

const LoadingTitle = styled.Text`
  font-family: "${Constants.fontPrimary}";
  font-size: 48px;
`;

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => navigation.navigate("Announcements"), 3000);
  }, []);

  return (
    <Loading>
      <LoadingTitle>nori</LoadingTitle>
    </Loading>
  );
};

export default LoadingScreen;
