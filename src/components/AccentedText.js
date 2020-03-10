import React from "react";
import styled from "styled-components";

const AccentedText = styled.Text`
  font-family: "${props => props.theme.fontSecondary}";
  font-size: 16px;
  color: ${props => props.theme.colorAccent};
  line-height: 30px;
`;

const AccentedTextComp = ({ children, ...others }) => {
  return <AccentedText {...others}>{children}</AccentedText>;
};

export default AccentedTextComp;
