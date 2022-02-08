import { Text, Box, Button } from "@chakra-ui/react";
import { DateTime } from "luxon";
import React from "react";
import { BsFillCalendar2RangeFill } from "react-icons/bs";

interface Props {
  setPickedDate: React.Dispatch<React.SetStateAction<Date>>;
}

/* RENDER BUTTON FOR TOMORROW DAY IN CALENDAR (ICON INCLUDED) */
export const TomorrowCalendarButton: React.FC<Props> = ({ setPickedDate }) => {
  /* LUXON FUNCTION TO GET TOMORROW DAY DATA */
  const tomorrowDate = () => {
    const tDate = DateTime.local().plus({ day: 1 }).toJSDate();
    setPickedDate(tDate);
  };

  return (
    <>
      <Button onClick={tomorrowDate}>
        <Box width="24px" height="24px" mr="10px" padding="4px">
          <BsFillCalendar2RangeFill color="green" />
        </Box>
        <Box maxW="100px">
          <Text fontSize="sm" fontWeight="500">
            Tomorrow
          </Text>
        </Box>
      </Button>
    </>
  );
};
