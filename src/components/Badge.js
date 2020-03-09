import React from "react";
import styled from "styled-components";

import Constants from "../Constants";

const Badge = styled.Text`
overflow: hidden;
color: white;
font-size: 14px;
font-family: "${Constants.fontSecondary}";
padding: 2.5px 5px;
border-radius: 8px;
`;

const BadgeComp = ({ children, ...others }) => {
  return <Badge {...others}>{children}</Badge>;
};

export default BadgeComp;
