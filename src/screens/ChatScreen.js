import React from "react";
import styled from "styled-components";

import Constants from "../Constants";

const Chat = styled.View`
  flex: 1;
  background-color: ${Constants.colorBg};
  justify-content: center;
  align-items: center;
`;

const HeroTitle = styled.Text`
  font-family: "${Constants.fontPrimary}";
  font-size: 48px;
  color: ${Constants.colorAccent};
`;

const ChatScreen = () => {
  return (
    <Chat>
      <HeroTitle>Chat</HeroTitle>
    </Chat>
  );
};

export default ChatScreen;
