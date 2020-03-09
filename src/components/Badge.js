import React from "react";
import styled from "styled-components";

const Badge = styled.Text`
overflow: hidden;
color: white;
font-size: 14px;
font-family: "${props => props.theme.fontSecondary}";
padding: 2.5px 5px;
border-radius: 8px;
`;

const BadgeComp = ({ children, ...others }) => {
  return <Badge {...others}>{children}</Badge>;
};

export default BadgeComp;
