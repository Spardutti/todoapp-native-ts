import { Text, Box, Button, Spacer } from "@chakra-ui/react";
import { DateTime } from "luxon";
import React from "react";
import { CgCalendarNext } from "react-icons/cg";

interface Props {
  setPickedDate: React.Dispatch<React.SetStateAction<Date>>;
}

/* RENDER BUTTON FOR WEEK DAY IN CALENDAR (ICON INCLUDED) */
export const NextWeekCalendarButton: React.FC<Props> = ({ setPickedDate }) => {
  let showedDate;
  if (DateTime.local().weekday === 1) {
    showedDate = DateTime.local().plus({ week: 1 }).toJSDate();
  } else {
    showedDate = DateTime.local().plus({ week: 1 }).startOf("week").toJSDate();
  }

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
        <Spacer />
        <Box>
          <Text fontSize="sm" textColor="blackAlpha.500">
            {showedDate.toString().slice(0, 4) +
              showedDate.toString().slice(7, 10)}
          </Text>
        </Box>
      </Button>
    </>
  );
};
