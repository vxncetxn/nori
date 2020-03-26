import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";

const FormTextArea = styled.TextInput`
  font-family: "${props => props.theme.fontSecondary}";
  font-size: 16px;
  color: ${props => props.theme.colorText};
  min-height: 400px;
`;

const FormTextAreaComp = ({ ...others }) => {
  const theme = useContext(ThemeContext);

  return (
    <FormTextArea
      multiline
      scrollEnabled={false}
      selectionColor={theme.colorAccent}
      placeholderTextColor={theme.colorInactiveGrey}
      {...others}
    />
  );
};

export default FormTextAreaComp;
