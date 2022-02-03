import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import WeekSelector from "./WeekSelector";

interface WeekDisplayProps {}

const WeekDisplay: React.FC<WeekDisplayProps> = () => {
  const [weekToShow, setWeekToShow] = useState<DateTime[]>();
  const [date, setDate] = useState(DateTime.now());
  const [today] = useState(DateTime.now());

  useEffect(() => {
    let firstDay = date.startOf("week");
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(firstDay.set({ weekday: +i }));
    }

    setWeekToShow(week);
  }, [date]);

  return (
    <Box pl={10}>
      <HStack mb={10} justify={"space-between"} align={"center"}>
        <Heading fontSize={25} cursor={"pointer"}>
          {date.monthLong} {date.year}
        </Heading>
        <WeekSelector date={date} setDate={setDate} />
      </HStack>
      <HStack justify={"space-evenly"}>
        {weekToShow?.map((elem, index) => {
          return (
            <div key={index}>
              {today.day === elem.day ? (
                <Box
                  textAlign={"center"}
                  cursor={"pointer"}
                  _hover={{ background: "#EEEEEE" }}
                  w={20}
                  py={2}
                  borderRadius={10}
                >
                  <Text>{elem.weekdayShort}</Text>
                  <Text color={"#DD4B56"}>{elem.day}</Text>
                </Box>
              ) : elem.startOf("day") < date.startOf("day") ? (
                <Box>
                  <Text>{elem.weekdayShort}</Text>
                  <Text color={"#DEDEDE"}>{elem.day}</Text>
                </Box>
              ) : (
                <Box
                  textAlign={"center"}
                  cursor={"pointer"}
                  _hover={{ background: "#EEEEEE" }}
                  w={20}
                  py={2}
                >
                  <Text>{elem.weekdayShort}</Text>
                  <Text>{elem.day}</Text>
                </Box>
              )}
            </div>
          );
        })}
      </HStack>
    </Box>
  );
};

export default WeekDisplay;
