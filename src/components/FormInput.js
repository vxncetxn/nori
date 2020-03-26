import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { SimpleLineIcons } from "@expo/vector-icons";

import AccentedText from "./AccentedText";

const FormInputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-color: ${props => props.theme.colorInactiveGrey};
  border-bottom-width: 1px;
  padding-bottom: 5px;
`;

const Input = styled.TextInput`
  flex-grow: 1;
  font-family: "${props => props.theme.fontSecondary}";
  font-size: 16px;
  color: ${props => props.theme.colorText};
  padding-left: 10px;
  padding-right: 70px;
  transform: translateY(-2px);
`;

const DeleteTextButton = styled.TouchableOpacity`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-7.5px);
`;

const FormInputComp = ({ style, label, value, onChangeText, ...others }) => {
  const theme = useContext(ThemeContext);

  return (
    <FormInputWrapper style={style}>
      <AccentedText>{label}</AccentedText>
      <Input
        blurOnSubmit
        returnKeyType="done"
        scrollEnabled={false}
        selectionColor={theme.colorAccent}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={theme.colorInactiveGrey}
        {...others}
      />
      {value ? (
        <DeleteTextButton onPress={() => onChangeText("")}>
          <SimpleLineIcons name="close" size={15} color={theme.colorWhite} />
        </DeleteTextButton>
      ) : null}
    </FormInputWrapper>
  );
};

export default FormInputComp;
