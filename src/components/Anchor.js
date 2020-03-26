import React from "react";
import styled from "styled-components";
import { Linking } from "expo";

import AccentedText from "./AccentedText";

const Anchor = styled.TouchableOpacity``;

const AnchorLabel = styled(AccentedText)`
  text-decoration-line: underline;
`;

const AnchorComp = ({ href, children, ...others }) => {
  return (
    <Anchor {...others} onPress={() => Linking.openURL(href)}>
      <AnchorLabel>{children}</AnchorLabel>
    </Anchor>
  );
};

export default AnchorComp;
