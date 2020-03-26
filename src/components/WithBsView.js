import React, { useRef } from "react";
import styled from "styled-components";
import Animated from "react-native-reanimated";

import FormBottomSheet from "../components/FormBottomSheet";

const BaseView = styled.View`
  flex: 1;
  background-color: #000000;
`;

const Overlay = styled(Animated.View)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const WithBsViewComp = React.forwardRef(
  ({ bsProps, bsChildren, children, ...others }, ref) => {
    const bsAnimNode = useRef(new Animated.Value(1));

    return (
      <BaseView>
        <Overlay
          style={{
            opacity: Animated.interpolate(bsAnimNode.current, {
              inputRange: [0, 1],
              outputRange: [0.2, 1],
              extrapolate: Animated.Extrapolate.CLAMP
            })
          }}
        >
          {children}
        </Overlay>
        <FormBottomSheet
          ref={ref}
          callbackNode={bsAnimNode.current}
          snapPoints={["85%", "0%"]}
          initialSnap={1}
          onCancel={() => requestAnimationFrame(() => ref.current.snapTo(1))}
          {...bsProps}
        >
          {bsChildren}
        </FormBottomSheet>
      </BaseView>
    );
  }
);

export default WithBsViewComp;
