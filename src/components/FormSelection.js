import React from "react";
import styled from "styled-components";

const FormSelection = styled.View``;

const SelectionOption = styled.TouchableOpacity``;

const SelectionOptionLabel = styled.Text`
  color: ${props =>
    props.selected ? props.theme.colorAccent : props.theme.colorText};
  font-size: 16px;
  font-family: "${props => props.theme.fontSecondary}";
`;

const FormSelectionComp = ({ options, value, setValue, ...others }) => {
  return (
    <FormSelection {...others}>
      {options.map((option, idx) => {
        return (
          <SelectionOption
            style={{ marginBottom: idx !== options.length - 1 ? 15 : 0 }}
            key={option}
            onPress={() => setValue(option)}
          >
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
