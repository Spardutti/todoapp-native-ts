import { Text, Box, Button } from "@chakra-ui/react";
import { DateTime } from "luxon";
import React from "react";
import { FaCouch } from "react-icons/fa";

interface Props {
  setPickedDate: React.Dispatch<React.SetStateAction<Date>>;
}

/* RENDER BUTTON FOR WEEKEND DAY IN CALENDAR (ICON INCLUDED) */
export const NextWeekEndCalendarButton: React.FC<Props> = ({
  setPickedDate,
}) => {
  /* LUXON FUNCTION TO GET NEXT SATURDAY */
  const nextWeekEndDate = () => {
    if (DateTime.local().weekday === 6) {
      const date = DateTime.local().plus({ week: 1 }).toJSDate();
      setPickedDate(date);
    } else if (DateTime.local().weekday === 7) {
      const date = DateTime.local().plus({ day: 6 }).toJSDate();
      setPickedDate(date);
    } else {
      const date = DateTime.local().endOf("week").minus({ day: 1 }).toJSDate();
      setPickedDate(date);
    }
  };
  return (
    <>
      <Button onClick={nextWeekEndDate}>
        <Box width="24px" height="24px" mr="10px" padding="4px">
          <FaCouch color="skyblue" />
        </Box>
        <Box maxW="100px">
          <Text fontSize="sm" fontWeight="500">
            Next weekend
          </Text>
        </Box>
      </Button>
    </>
  );
};
