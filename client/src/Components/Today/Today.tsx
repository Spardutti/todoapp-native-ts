import { Heading, HStack, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useGetTodaysTodos } from "../../api/Todo/get_todo";
import { useAppSelector } from "../../hooks";
import { AddTodoModal } from "../Todos/AddTodoModal";
import OverdueTodos from "./OverdueTodos";
import Todos from "./Todos";

interface TodayProps {}

const Today: React.FC<TodayProps> = () => {
  const token = useAppSelector((state) => state.token.token);
  const [todayTodos, setTodayTodos] = useState([]);
  const [olderTodos, setOlderTodos] = useState([]);
  const [currentDate] = useState(new Date(Date.now()));
  const { isLoading, data } = useGetTodaysTodos(token);

  useEffect(() => {
    if (data) {
      setTodayTodos(data.data.todayTodos);
      setOlderTodos(data.data.olderTodos);
    }
  }, [data]);

  if (isLoading) return <p>Loading</p>;

  return (
    <Stack p={10} w={1000} mx="auto">
      <Heading fontSize={25}>
        Today{" "}
        <span style={{ fontSize: "13px", color: "gray", fontWeight: "normal" }}>
          {currentDate.toLocaleString("default", { weekday: "short" })}{" "}
          {currentDate.toLocaleString("default", { month: "short" })}{" "}
          {currentDate.toLocaleDateString("default", { day: "numeric" })}
        </span>
      </Heading>
      {olderTodos ? <OverdueTodos todo={olderTodos} /> : null}
      <Todos todo={todayTodos} />
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
        cursor={"pointer"}
      >
        <AddTodoModal color={"red"} />
        <Text> Add Todo </Text>
      </HStack>
    </Stack>
  );
};

export default Today;
