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
    <div className="buttonDiv">
      <Box maxWidth="sm" onClick={openDatePicker} className="box">
        <div className="iconDiv">
          <BsCalendar4Event className="icon" />
        </div>
        <div>
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
        </div>
        <div className="showDateDiv">
          <p>Hoy</p>
        </div>
      </Box>
    </div>
  );
};
