import {
  Box,
  Button,
  CloseButton,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Divider,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../Styles/calendar/calendarButton.scss";
import React from "react";
import { BsCalendar4Event } from "react-icons/bs";

type Props = {
  dueDate: Date | null;
  newTodo: object;
  setNewTodo: Function;
};

export const CalendarButton: React.FC<Props> = ({
  dueDate,
  newTodo,
  setNewTodo,
}) => {
  const [datePickerToggle, setDatePickerToggle] = useState(false);

  const openDatePicker = () => {
    setDatePickerToggle(!datePickerToggle);
  };

  return (
    <Box maxH="38px" className="buttonDiv">
      <Box maxH="26px" maxWidth="sm" onClick={openDatePicker} className="box">
        <Box className="iconDiv" maxH="16px" maxW="18px">
          <BsCalendar4Event className="icon" />
        </Box>
        <Box>
          <DatePicker
            minDate={new Date()}
            selected={dueDate}
            onChange={(date) =>
              date &&
              setNewTodo({
                ...newTodo,
                dueDate: date,
              })
            }
            open={datePickerToggle}
            className="pickerDiv"
          />
        </Box>
        <Box className="showDateDiv" maxH="16px">
          <Text fontSize="xs">Hoy</Text>
        </Box>
      </Box>
    </Box>
  );
};
