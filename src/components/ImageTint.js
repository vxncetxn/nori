import React from "react";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";

const ImageTint = styled(LinearGradient)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const ImageTintComp = ({ ...others }) => {
  return (
    <ImageTint
      colors={["rgba(0, 0, 0, 0.1)", "rgba(0, 0, 0, 1)"]}
      {...others}
    ></ImageTint>
  );
};

export default ImageTintComp;
