import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useGetTodaysTodos } from "../../api/Todo/get_todo";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { AddTodoModal } from "../Todos/AddTodoModal";
import OverdueTodos from "../OverdueTodos/OverdueTodos";
import { DateTime } from "luxon";
import TodoCard from "../Todos/TodoCard";
import { setTodos } from "../../store/Reducers/Todos/todoReducer";
import { ReactComponent as Relax } from "../../Images/relax.svg";

interface TodayProps {}

/*  SHOW TODAY TODOS & OVERDUES IF THEY EXIST */
const Today: React.FC<TodayProps> = () => {
  const token = useAppSelector((state) => state.token.token);
  const [overdueLength] = useState(
    useAppSelector((state) => state.todos.overdue)
  );
  const [todayTodos, setTodayTodos] = useState([]);
  const [currentDate] = useState(DateTime.now());

  /* FETCH TODAY TODOS */
  const { isLoading, data } = useGetTodaysTodos(token);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      setTodayTodos(data.data);
      dispatch(setTodos(data.data.length));
    }
  }, [data, dispatch]);

  const NoTodos = () => (
    <Center align={"center"}>
      <Stack>
        <Relax width={400} height={400} />
        <Heading fontSize={20} pt={10}>
          Everything is up to date
        </Heading>
        <Center>
          <Box>
            <Text py={5} color="gray" fontSize={10}>
              All your tasks that are due today will show up here.
            </Text>
            <Button colorScheme={"red"}>
              <AddTodoModal
                preSelectedDate={null}
                color={"white"}
                text="Add a task"
              />
            </Button>
          </Box>
        </Center>
      </Stack>
    </Center>
  );

  if (isLoading) return <p>Loading</p>;

  return (
    <Stack px={10}>
      <Heading fontSize={20} alignSelf="flex-start">
        Today{" "}
        <span style={{ fontSize: "12px", color: "gray", fontWeight: "normal" }}>
          {currentDate.weekdayShort} {currentDate.monthShort} {currentDate.day}
        </span>
      </Heading>

      {todayTodos.length === 0 && overdueLength === 0 ? (
        <NoTodos />
      ) : (
        <>
          <OverdueTodos />
          <Box mt={10} p={10} px={0}>
            <HStack overflow={"hidden"} justify={"space-between"}>
              <Heading fontSize={14}>
                {currentDate.monthShort} {currentDate.day} - Today
              </Heading>
            </HStack>
            <Divider py={2} />
            {todayTodos.map((elem, index) => {
              return <TodoCard todo={elem} key={index} />;
            })}
          </Box>
          <HStack
            px={0}
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
            <AddTodoModal
              preSelectedDate={null}
              color={"red"}
              text="Add Task"
            />
          </HStack>
        </>
      )}
    </Stack>
  );
};

export default Today;
