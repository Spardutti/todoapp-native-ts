import { Box, Divider, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import { DateTime } from "luxon";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaLessThan, FaGreaterThan } from "react-icons/fa";

interface WeekSelectorProps {
  date: DateTime;
  setDate: Dispatch<SetStateAction<DateTime>>;
}

const WeekSelector: React.FC<WeekSelectorProps> = ({ date, setDate }) => {
  const [today] = useState<DateTime>(DateTime.now());

  const nextWeek = () => {
    setDate(DateTime.fromObject({ weekNumber: date.weekNumber + 1 }));
  };

  const prevWeek = () => {
    setDate(DateTime.fromObject({ weekNumber: date.weekNumber - 1 }));
  };

  const todayDate = () => {
    setDate(today);
  };

  return (
    <HStack>
      <Grid
        templateColumns={"1fr 1fr"}
        h={7}
        border="1px"
        borderColor={"#CCCCCC"}
        borderRadius={4}
        py={0}
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
        h={7}
        borderRadius={4}
        _hover={{
          background: "#EEE",
        }}
        onClick={todayDate}
      >
        Today
      </Box>
    </HStack>
  );
};

export default WeekSelector;
