import { Button, useDisclosure, Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { CalendarModal } from "./CalendarModal";
import { BsCalendar4Event } from "react-icons/bs";
import "../../Styles/calendar/calendarButton.scss";

interface CalendarProps {
  pickedDate: Date | null;
  setPickedDate: React.Dispatch<React.SetStateAction<Date>>;
}

export const OpenCalendarButton: React.FC<CalendarProps> = ({
  pickedDate,
  setPickedDate,
}) => {
  const [calendarText, setCalendarText] = useState(1);

  const {
    isOpen: isCalendarOpen,
    onOpen: onCalendarOpen,
    onClose: onCalendarClose,
  } = useDisclosure();

  /* DISPLAY THE CORRECT DAY TEXT DEPENDING ON THE CALENDAR TEXT INFO */
  let dayText = (
    <Box display="flex" justifyContent="space-between">
      <BsCalendar4Event color="green" />
      <Text ml="5px" fontSize="13px" textColor="green">
        Today
      </Text>
    </Box>
  );

  if (calendarText === 1) {
    dayText = (
      <Box display="flex" justifyContent="space-between">
        <BsCalendar4Event color="green" />
        <Text ml="5px" fontSize="13px" textColor="green">
          Today
        </Text>
      </Box>
    );
  } else if (calendarText === 2) {
    dayText = (
      <Box display="flex" justifyContent="space-between">
        <BsCalendar4Event color="#ad6200" />
        <Text ml="5px" fontSize="13px" textColor="#ad6200">
          Tomorrow
        </Text>
      </Box>
    );
  } else {
    dayText = (
      <Box display="flex" justifyContent="space-between">
        <BsCalendar4Event color="#0074D9" />
        <Text ml="5px" fontSize="13px" textColor="#0074D9">
          {pickedDate?.toString().slice(4, 10)}
        </Text>
      </Box>
    );
  }

  return (
    <>
      <Button
        onClick={onCalendarOpen}
        maxW="100px"
        height="26px"
        display="flex"
        justifyContent="space-between"
        px="8px"
        border="1px"
        borderColor="blackAlpha.400"
        bgColor="white"
      >
        {dayText}
      </Button>
      <CalendarModal
        pickedDate={pickedDate}
        setPickedDate={setPickedDate}
        setCalendarText={setCalendarText}
        isOpen={isCalendarOpen}
        onClose={onCalendarClose}
      />
    </>
  );
};
