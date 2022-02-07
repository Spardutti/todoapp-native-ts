import { Box, Divider, Heading, HStack, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useGetTodaysTodos } from "../../api/Todo/get_todo";
import { useAppSelector } from "../../hooks";
import { AddTodoModal } from "../Todos/AddTodoModal";
import OverdueTodos from "../OverdueTodos/OverdueTodos";
import { DateTime } from "luxon";
import TodoCard from "../Todos/TodoCard";

interface TodayProps {}

/*  SHOW TODAY TODOS & OVERDUES IF THEY EXIST */
const Today: React.FC<TodayProps> = () => {
  const token = useAppSelector((state) => state.token.token);
  const [todayTodos, setTodayTodos] = useState([]);
  const [currentDate] = useState(DateTime.now());
  const { isLoading, data } = useGetTodaysTodos(token);

  useEffect(() => {
    if (data) {
      setTodayTodos(data.data);
    }
  }, [data]);

  if (isLoading) return <p>Loading</p>;

  return (
    <Stack>
      <OverdueTodos />
      <Box mt={10} px={10}>
        <HStack overflow={"hidden"} justify={"space-between"}>
          <Heading fontSize={15}>
            {currentDate.monthShort} {currentDate.day} - Today
          </Heading>
        </HStack>
        <Divider py={2} />
        {todayTodos.map((elem, index) => {
          return <TodoCard todo={elem} key={index} />;
        })}
      </Box>
      <HStack
        px={10}
        pb={10}
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
    </Stack>
  );
};

export default Today;
