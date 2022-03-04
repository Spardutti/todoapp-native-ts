import { Button, useDisclosure, Box, Text } from "@chakra-ui/react";
import React from "react";
import { CalendarModal } from "./CalendarModal";
import { BsCalendar4Event } from "react-icons/bs";

interface CalendarProps {
  pickedDate: Date | null;
  setPickedDate: React.Dispatch<React.SetStateAction<Date>>;
}

export const OpenCalendarButton: React.FC<CalendarProps> = ({
  pickedDate,
  setPickedDate,
}) => {
  const {
    isOpen: isCalendarOpen,
    onOpen: onCalendarOpen,
    onClose: onCalendarClose,
  } = useDisclosure();

  let dayText = (
    <Box display="flex" justifyContent="space-between">
      <BsCalendar4Event color="green" />
      <Text ml="5px" fontSize="13px" textColor="green">
        Today
      </Text>
    </Box>
  );

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
        dayText={dayText}
        isOpen={isCalendarOpen}
        onClose={onCalendarClose}
      />
    </>
  );
};
