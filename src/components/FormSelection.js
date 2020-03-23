import React from "react";
import styled from "styled-components";

const FormSelection = styled.View``;

const SelectionOption = styled.TouchableOpacity`
  margin-bottom: 20px;
`;

const SelectionOptionLabel = styled.Text`
  color: ${props =>
    props.selected ? props.theme.colorAccent : props.theme.colorText};
  font-size: 16px;
  font-family: "${props => props.theme.fontSecondary}";
`;

const FormSelectionComp = ({ options, value, setValue, ...others }) => {
  return (
    <FormSelection {...others}>
      {options.map(option => {
        return (
          <SelectionOption key={option} onPress={() => setValue(option)}>
            <SelectionOptionLabel selected={option === value}>
              {option} {option === value ? "✓" : null}
            </SelectionOptionLabel>
          </SelectionOption>
        );
      })}
    </FormSelection>
  );
};

export default FormSelectionComp;
