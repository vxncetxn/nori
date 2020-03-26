import React, { useState, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";

import AccentedText from "./AccentedText";
import RegText from "./RegText";

const FormDateTime = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-color: ${props => props.theme.colorInactiveGrey};
  border-bottom-width: 1px;
  padding-bottom: 5px;
`;

const FormDateTimeComp = ({
  style,
  label,
  value,
  onChange,
  placeholder,
  ...others
}) => {
  const theme = useContext(ThemeContext);
  const [shown, setShown] = useState(false);

  return (
    <>
      <FormDateTime style={style} onPress={() => setShown(!shown)}>
        <AccentedText>{label}</AccentedText>
        <RegText style={value ? null : { color: theme.colorInactiveGrey }}>
          {value ? format(value, "do LLLL yyyy, K:mma") : placeholder}
        </RegText>
      </FormDateTime>
      {shown && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value ? value : new Date()}
          mode={"datetime"}
          minimumDate={new Date()}
          display="default"
          onChange={onChange}
        />
      )}
    </>
  );
};

export default FormDateTimeComp;
