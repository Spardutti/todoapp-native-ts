import { Text, Box, Button } from "@chakra-ui/react";
import { DateTime } from "luxon";
import React from "react";
import { CgCalendarNext } from "react-icons/cg";

interface Props {
  setPickedDate: React.Dispatch<React.SetStateAction<Date>>;
}

/* RENDER BUTTON FOR WEEK DAY IN CALENDAR (ICON INCLUDED) */
export const NextWeekCalendarButton: React.FC<Props> = ({ setPickedDate }) => {
  /* LUXON FUNCTION TO SET THE NEXT MONDAY */
  const nextWeekDate = () => {
    if (DateTime.local().weekday === 1) {
      const date = DateTime.local().plus({ week: 1 }).toJSDate();
      setPickedDate(date);
    } else {
      const date = DateTime.local()
        .plus({ week: 1 })
        .startOf("week")
        .toJSDate();
      setPickedDate(date);
    }
  };

  return (
    <>
      <Button
        onClick={nextWeekDate}
        width="250px"
        height="45.3px"
        px="10px"
        py="4px"
        bgColor="white"
      >
        <Box width="24px" height="24px" mr="10px" padding="4px">
          <CgCalendarNext color="purple" />
        </Box>
        <Box maxW="100px">
          <Text fontSize="sm" fontWeight="500">
            Next week
          </Text>
        </Box>
      </Button>
    </>
  );
};
