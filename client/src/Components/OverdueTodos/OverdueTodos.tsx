import { Box, Divider, Heading, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useGetOverdueTodos } from "../../api/Todo/get_todo";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setOverdue } from "../../store/Reducers/Todos/todoReducer";
import LoadingSpinner from "../Buttons/LoadingSpinner";
import TodoCard from "../Todos/TodoCard";

/* FETCH AND DISPLAY OVERDUE TODOS */
const OverdueTodos: React.FC = () => {
  const token = useAppSelector((state) => state.token.token);
  const [overdueTodos, setOverdueTodos] = useState([]);

  const dispatch = useAppDispatch();

  /* GET OVERDUE TODOS */
  const { isLoading, data } = useGetOverdueTodos(token);

  useEffect(() => {
    if (data) {
      setOverdueTodos(data.data);
      dispatch(setOverdue(data.data.length));
    }
  }, [data, dispatch]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <Box w={"100%"}>
      {data.data.length === 0 ? null : (
        <Box p={10} px={0}>
          <HStack overflow={"hidden"} justify={"space-between"}>
            <Heading fontSize={15}>Overdue</Heading>
            {/* <Text color={"red"}>Reschedule</Text> */}
          </HStack>
          <Divider py={2} />
          {overdueTodos.map((elem, index) => {
            return <TodoCard todo={elem} key={index} />;
          })}
        </Box>
      )}
    </Box>
  );
};

export default OverdueTodos;
