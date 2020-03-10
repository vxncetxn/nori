import React from "react";
import styled from "styled-components";

const RegText = styled.Text`
  font-family: "${props => props.theme.fontSecondary}";
  font-size: 16px;
  color: ${props => props.theme.colorText};
  line-height: 30px;
`;

const RegTextComp = ({ children, ...others }) => {
  return <RegText {...others}>{children}</RegText>;
};

export default RegTextComp;
