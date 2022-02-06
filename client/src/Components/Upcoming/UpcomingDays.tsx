import { Box, Divider, HStack, Text } from "@chakra-ui/react";
import { DateTime } from "luxon";
import React, { useState, useEffect } from "react";
import { useGetTodaysTodos } from "../../api/Todo/get_todo";
import { useAppSelector } from "../../hooks";
import OverdueTodos from "../Today/OverdueTodos";
import { AddTodoModal } from "../Todos/AddTodoModal";

interface UpcomingDaysProps {
  selectedDate: DateTime;
}

/* DISPLAY UPCOMING DAYS */
const UpcomingDays: React.FC<UpcomingDaysProps> = ({ selectedDate }) => {
  const token = useAppSelector((state) => state.token.token);
  const { isLoading, data } = useGetTodaysTodos(token);
  const [overdueTodos, setOverdueTodos] = useState([]);
  const [daysFrom, setDaysFrom] = useState<DateTime[]>([]);

  /* GET OVERDUE TODOS */
  useEffect(() => {
    if (data) setOverdueTodos(data.data.olderTodos);
  }, [data]);

  /* CREATES AN ARRAY TO DISPLAY UPCOMING DAYS */
  useEffect(() => {
    const firstDay = selectedDate;
    const days = [];

    for (let i = 0; i < 30; i++) {
      days.push(firstDay.set({ day: firstDay.day + i }));
    }

    setDaysFrom(days);
  }, [selectedDate]);

  /* RENDER UPCOMING DAYS */
  const DisplayDays = () => {
    return (
      <>
        {daysFrom.map((day, index) => {
          return (
            <Box key={index} p={10}>
              <Text fontWeight={"bold"} color="gray">
                {day.monthShort} {day.day} - {day.weekdayLong}
              </Text>
              <Divider />
              <HStack
                _focus={{
                  boxShadow: "none",
                }}
                variant={"none"}
                mt={2}
                _hover={{ color: "red" }}
                fontWeight={"normal"}
                fontSize={13}
                color={"gray"}
              >
                <AddTodoModal color={"red"} text="Add Todo" />
              </HStack>
            </Box>
          );
        })}
      </>
    );
  };

  if (isLoading) return <p>Loading</p>;

  return (
    <Box mt={40}>
      <Box>{overdueTodos && <OverdueTodos todo={overdueTodos} />}</Box>
      <DisplayDays />
    </Box>
  );
};

export default UpcomingDays;
