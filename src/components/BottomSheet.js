import React from "react";
import styled from "styled-components";
import { Dimensions } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";

import Constants from "../Constants";

const BsContent = styled.View`
  background-color: ${Constants.colorBgLight};
  height: ${Dimensions.get("window").height * 0.8}px;
  padding: 70px 20px 0 20px;
`;

const BsGestureBar = styled.View`
  position: absolute;
  left: 55.5%;
  top: 30px;
  transform: translateX(-50px);
  width: 100px;
  height: 2.5px;
  background-color: white;
`;

const BottomSheetComp = React.forwardRef(({ children, ...others }, ref) => {
  return (
    <BottomSheet
      ref={ref}
      borderRadius={8}
      {...others}
      renderContent={() => (
        <BsContent>
          <BsGestureBar />
          {children}
        </BsContent>
      )}
    />
  );
});

export default BottomSheetComp;
