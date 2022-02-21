import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Box, Divider, Heading, HStack, Text } from "@chakra-ui/react";
import WeekSelector from "./WeekSelector";
import UpcomingDays from "./UpcomingDays";

interface WeekDisplayProps {}

/* DISPLAY THE WEEKDAY IN THE UPCOMING PAGE */
const WeekDisplay: React.FC<WeekDisplayProps> = () => {
  const [weekToShow, setWeekToShow] = useState<DateTime[]>();
  const [date, setDate] = useState(DateTime.now());
  const [today] = useState(DateTime.now());
  const [selectedDay, setSelectedDay] = useState(DateTime.now());

  useEffect(() => {
    let firstDay = date.startOf("week");
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(firstDay.set({ weekday: +i }));
    }

    setWeekToShow(week);
  }, [date]);

  const selectDate = (e: any) => {
    const date = DateTime.fromObject({
      day: e.day,
      month: e.month,
      year: e.year,
    });
    setDate(date);
    setSelectedDay(date);
  };

  return (
    <Box>
      <Box
        pt={10}
        position="fixed"
        top={12}
        w={"100%"}
        px={10}
        bg="white"
        zIndex={100}
      >
        <HStack w={800} mb={5} justify={"space-between"} align={"center"}>
          <Heading fontSize={20} cursor={"pointer"}>
            {date.monthLong} {date.year}
          </Heading>
          <WeekSelector
            date={date}
            setDate={setDate}
            today={today}
            setSelectedDay={setSelectedDay}
          />
        </HStack>
        <HStack justify={"space-evenly"} pb={1} w={800}>
          {weekToShow?.map((elem, index) => {
            return (
              <div key={index}>
                {selectedDay.day === elem.day ? (
                  <Box
                    textAlign={"center"}
                    cursor={"pointer"}
                    _hover={{ background: "#EEEEEE" }}
                    w={20}
                    py={2}
                    borderRadius={10}
                    onClick={() => selectDate(elem)}
                  >
                    <Text fontSize={13}>{elem.weekdayShort}</Text>
                    <Text fontSize={13} color={"#DD4B56"}>
                      {elem.day}
                    </Text>
                  </Box>
                ) : elem.startOf("day") < today.startOf("day") ? (
                  <Box>
                    <Text fontSize={13}>{elem.weekdayShort}</Text>
                    <Text fontSize={13} color={"#DEDEDE"}>
                      {elem.day}
                    </Text>
                  </Box>
                ) : (
                  <Box
                    textAlign={"center"}
                    cursor={"pointer"}
                    _hover={{ background: "#EEEEEE" }}
                    w={20}
                    py={2}
                    borderRadius={10}
                    onClick={() => selectDate(elem)}
                  >
                    <Text fontSize={13}>{elem.weekdayShort}</Text>
                    <Text fontSize={13}>{elem.day}</Text>
                  </Box>
                )}
              </div>
            );
          })}
        </HStack>
        <Divider maxW={800} />
      </Box>
      <UpcomingDays selectedDate={selectedDay} />
    </Box>
  );
};

export default WeekDisplay;
