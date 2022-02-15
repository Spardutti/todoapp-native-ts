import { Box, Divider, HStack, Text } from "@chakra-ui/react";
import { DateTime } from "luxon";
import React, { useState, useEffect } from "react";
import { useGetUpcomingTodos } from "../../api/Todo/get_todo";
import { useAppSelector } from "../../hooks";
import OverdueTodos from "../OverdueTodos/OverdueTodos";
import { AddTodoModal } from "../Todos/AddTodoModal";
import TodoCard from "../Todos/TodoCard";

interface UpcomingDaysProps {
  selectedDate: DateTime;
}

interface Todo {
  _id: string;
  todoName: string;
  dueDate: string;
  isCompleted: boolean;
  todoDescription: string;
  category: {
    categoryName: string;
    _id: string;
    color: string;
  };
}

/* DISPLAY UPCOMING DAYS*/
const UpcomingDays: React.FC<UpcomingDaysProps> = ({ selectedDate }) => {
  const token = useAppSelector((state) => state.token.token);
  const [daysFrom, setDaysFrom] = useState<DateTime[]>([]);
  const [upcomingTodos, setUpcomingTodos] = useState<Todo[]>([]);

  /* GET UPCOMING TODOS */
  const { isLoading, data } = useGetUpcomingTodos(token);

  useEffect(() => {
    if (data) setUpcomingTodos(data.data);
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

  if (isLoading) return <p>Loading ...</p>;

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
              {/* CHECK IF DATE MATCH TO SHOW A TODO 
              ON THE CORRESPONDING DATE */}
              {upcomingTodos.map((todo, idx) => {
                const date = day.toLocaleString();
                const todoDate = DateTime.fromJSDate(
                  new Date(todo.dueDate)
                ).toLocaleString();

                if (date === todoDate)
                  return <TodoCard todo={todo} key={idx} />;
                return null;
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
                <AddTodoModal
                  preSelectedDate={day.toJSDate()}
                  color={"red"}
                  text="Add Todo"
                />
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
