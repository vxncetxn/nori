import React from "react";
import styled from "styled-components";
import { Dimensions } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";

import AccentedText from "../components/AccentedText";

const BsContent = styled.View`
  background-color: ${props => props.theme.colorBgCard};
  height: ${Dimensions.get("window").height * 0.75}px;
  padding: 0 20px 20px 20px;
`;

const BsGestureBar = styled.View`
  position: absolute;
  left: 47.5%;
  top: 15px;
  width: 60px;
  height: 2.5px;
  background-color: ${props => props.theme.colorInactiveGrey};
`;

const BsHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: ${Dimensions.get("window").height * 0.1}px;
  background-color: ${props => props.theme.colorBgCard};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const CancelButton = styled.TouchableOpacity``;

const SubmitButton = styled.TouchableOpacity``;

const BottomSheetComp = React.forwardRef(
  ({ onCancel, submitLabel, onSubmit, children, ...others }, ref) => {
    return (
      <BottomSheet
        ref={ref}
        {...others}
        renderContent={() => <BsContent extraHeight={0}>{children}</BsContent>}
        renderHeader={() => (
          <BsHeader>
            <BsGestureBar />
            <CancelButton onPress={onCancel}>
              <AccentedText>Cancel</AccentedText>
            </CancelButton>
            <SubmitButton onPress={onSubmit}>
              <AccentedText>{submitLabel}</AccentedText>
            </SubmitButton>
          </BsHeader>
        )}
      />
    );
  }
);

export default BottomSheetComp;
