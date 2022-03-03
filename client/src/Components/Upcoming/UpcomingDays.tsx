import { Box, Divider, HStack, Text } from "@chakra-ui/react";
import { DateTime } from "luxon";
import React, { useState, useEffect } from "react";
import { useGetUpcomingTodos } from "../../api/Todo/get_todo";
import { useAppSelector } from "../../hooks";
import OverdueTodos from "../OverdueTodos/OverdueTodos";
import { AddTodoModal } from "../Todos/AddTodoModal";
import TodoCard from "../Todos/TodoCard";
import { Todo } from "../../Interface/Interface";
import LoadingSpinner from "../Buttons/LoadingSpinner";

interface UpcomingDaysProps {
  selectedDate: DateTime;
}

/* DISPLAY UPCOMING DAYS*/
const UpcomingDays: React.FC<UpcomingDaysProps> = ({ selectedDate }) => {
  const token = useAppSelector((state) => state.token.token);
  const [daysFrom, setDaysFrom] = useState<DateTime[]>([]);
  const [upcomingTodos, setUpcomingTodos] = useState<Todo[]>([]);
  const [months, setMonths] = useState<string[]>([]);

  /* GET UPCOMING TODOS */
  const { isLoading, data } = useGetUpcomingTodos(token);

  useEffect(() => {
    if (data) setUpcomingTodos(data.data);
  }, [data]);

  // /* CREATES AN ARRAY TO DISPLAY UPCOMING DAYS */
  // useEffect(() => {
  //   const firstDay = selectedDate;
  //   const days = [];

  //   for (let i = 0; i < 30; i++) {
  //     days.push(firstDay.set({ day: firstDay.day + i }));
  //   }

  //   setDaysFrom(days);
  //   return () => {
  //     setDaysFrom([]);
  //   };
  // }, [selectedDate]);

  const getMonths = () => {
    const monthsArr: string[] = [];
    upcomingTodos.map((todo: Todo, index) => {
      const jsDate = new Date(todo.dueDate);
      const month = DateTime.fromJSDate(jsDate).setLocale("en-US").monthLong;
      if (monthsArr.indexOf(month) === -1) {
        monthsArr.push(month);
      }
    });
    setMonths(monthsArr);
  };

  useEffect(() => {
    getMonths();
  }, [upcomingTodos]);

  if (isLoading) return <LoadingSpinner />;

  /* RENDER UPCOMING DAYS */
  const DisplayDays = () => {
    return (
      <>
        {months.map((month, index) => {
          return (
            <Box key={index} p={10} px={0} w={"100%"} maxW={800}>
              <Text fontWeight={"bold"} color="black.500" pb={1}>
                {month}
              </Text>
              <Divider />
              {upcomingTodos.map((todo: Todo, index) => {
                const todoDate = DateTime.fromJSDate(
                  new Date(todo.dueDate)
                ).setLocale("en-US");
                if (todoDate.monthLong === month) {
                  return <TodoCard todo={todo} key={index} />;
                }
              })}

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
                {/*        <AddTodoModal
                  preSelectedDate={day.toJSDate()}
                  color={"red"}
                  text="Add Task"
                /> */}
              </HStack>
            </Box>
          );
        })}
      </>
    );
  };

  return (
    <Box mt={40}>
      <OverdueTodos />
      <DisplayDays />
    </Box>
  );
};

export default UpcomingDays;
