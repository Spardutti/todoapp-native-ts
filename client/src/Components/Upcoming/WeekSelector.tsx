import { Box, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import { DateTime } from "luxon";
import React, { Dispatch, SetStateAction } from "react";
import { FaLessThan, FaGreaterThan } from "react-icons/fa";

interface WeekSelectorProps {
  date: DateTime;
  setDate: Dispatch<SetStateAction<DateTime>>;
  today: DateTime;
  setSelectedDay: Dispatch<SetStateAction<DateTime>>;
}

/* DISPLAY BUTTONS TO NAVIGATE IN THE WEEK DISPLAY */
const WeekSelector: React.FC<WeekSelectorProps> = ({
  date,
  setDate,
  today,
  setSelectedDay,
}) => {
  const nextWeek = () => {
    setDate(DateTime.fromObject({ weekNumber: date.weekNumber + 1 }));
  };

  const prevWeek = () => {
    setDate(DateTime.fromObject({ weekNumber: date.weekNumber - 1 }));
  };

  const todayDate = () => {
    setDate(DateTime.now());
    setSelectedDay(DateTime.now());
  };

  return (
    <HStack>
      <Grid
        templateColumns={"1fr 1fr"}
        h={6}
        border="1px"
        borderColor={"#CCCCCC"}
        borderRadius={4}
      >
        <VStack
          px={2}
          justifyContent={"center"}
          _hover={{
            background: "#EEE",
          }}
        >
          {date.weekNumber <= today.weekNumber ? (
            <Text color={"#DEDEDE"}>
              <FaLessThan />
            </Text>
          ) : (
            <Text onClick={prevWeek} cursor={"pointer"}>
              <FaLessThan />
            </Text>
          )}
        </VStack>
        <VStack
          justifyContent={"center"}
          borderLeftWidth={"1px"}
          _hover={{
            background: "#EEE",
          }}
        >
          <Text cursor={"pointer"} onClick={nextWeek}>
            <FaGreaterThan />
          </Text>
        </VStack>
      </Grid>
      <Box
        cursor={"pointer"}
        border="1px"
        borderColor={"#CCCCCC"}
        px={4}
        h={6}
        borderRadius={4}
        _hover={{
          background: "#EEE",
        }}
        onClick={todayDate}
      >
        <Text fontSize={15} userSelect={"none"}>
          Today
        </Text>
      </Box>
    </HStack>
  );
};

export default WeekSelector;
