import { Text, Box, Button, Spacer } from "@chakra-ui/react";
import { DateTime } from "luxon";
import React from "react";
import { BsFillCalendar2RangeFill } from "react-icons/bs";

interface Props {
  setPickedDate: React.Dispatch<React.SetStateAction<Date>>;
}

/* RENDER BUTTON FOR TOMORROW DAY IN CALENDAR (ICON INCLUDED) */
export const TomorrowCalendarButton: React.FC<Props> = ({ setPickedDate }) => {
  /* LUXON FUNCTION TO GET TOMORROW DAY DATA */
  const date = DateTime.local().plus({ day: 1 }).toJSDate();
  const tomorrowDate = () => {
    setPickedDate(date);
  };

  return (
    <>
      <Button
        onClick={tomorrowDate}
        width="250px"
        height="45.3px"
        px="10px"
        py="4px"
        bgColor="white"
        display="flex"
        flexDir="row"
        justifyContent="start"
      >
        <Box
          width="24px"
          height="24px"
          mr="10px"
          padding="4px"
          display="flex"
          flexDir="row"
          justifyContent="flex-start"
        >
          <BsFillCalendar2RangeFill color="green" />
        </Box>
        <Box maxW="100px">
          <Text fontSize="sm" fontWeight="500">
            Tomorrow
          </Text>
        </Box>
        <Spacer />
        <Box>
          <Text fontSize="sm" textColor="blackAlpha.500">
            {date.toString().slice(0, 4) + date.toString().slice(7, 10)}
          </Text>
        </Box>
      </Button>
    </>
  );
};
