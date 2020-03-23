import React, { useState, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import Collapsible from "react-native-collapsible";
import { SimpleLineIcons } from "@expo/vector-icons";

import AccentedText from "./AccentedText";

const FormExpander = styled.View``;

const ExpanderToggle = styled.TouchableOpacity``;

const FormExpanderComp = ({
  style,
  label,
  onExpandSideEffect,
  onCollapseSideEffect,
  children,
  ...others
}) => {
  const theme = useContext(ThemeContext);
  const [collapsed, setCollapsed] = useState(true);

  return (
    <FormExpander style={style} {...others}>
      <ExpanderToggle
        onPress={() => {
          if (collapsed) {
            onExpandSideEffect && onExpandSideEffect();
            setCollapsed(false);
          } else {
            setCollapsed(true);
            onCollapseSideEffect &&
              setTimeout(() => onCollapseSideEffect(), 300);
          }
        }}
      >
        <AccentedText>
          {collapsed ? "Add" : "Remove"} {label}
          {"  "}
          {collapsed ? (
            <SimpleLineIcons name="plus" size={14} color={theme.colorAccent} />
          ) : (
            <SimpleLineIcons name="minus" size={14} color={theme.colorAccent} />
          )}
        </AccentedText>
      </ExpanderToggle>
      <Collapsible style={{ paddingLeft: 20 }} collapsed={collapsed}>
        {children}
      </Collapsible>
    </FormExpander>
  );
};

export default FormExpanderComp;
