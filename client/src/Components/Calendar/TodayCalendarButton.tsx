import { Text, Box, Button } from "@chakra-ui/react";
import { DateTime } from "luxon";
import React from "react";
import { BsSunFill } from "react-icons/bs";

interface Props {
  setPickedDate: React.Dispatch<React.SetStateAction<Date>>;
}

/* RENDER BUTTON FOR TOMORROW DAY IN CALENDAR (ICON INCLUDED) */
export const TodayCalendarButton: React.FC<Props> = ({ setPickedDate }) => {
  /* LUXON FUNCTION TO GET TOMORROW DAY DATA */
  const todayDate = () => {
    const date = DateTime.local().toJSDate();
    setPickedDate(date);
  };

  return (
    <>
      <Button
        onClick={todayDate}
        width="250px"
        height="45.3px"
        px="10px"
        py="4px"
        bgColor="white"
      >
        <Box width="24px" height="24px" mr="10px" padding="4px">
          <BsSunFill color="#ffdc00" />
        </Box>
        <Box maxW="100px">
          <Text fontSize="sm" fontWeight="500">
            Today
          </Text>
        </Box>
      </Button>
    </>
  );
};
