import { Box, Divider, Heading, HStack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useGetOverdueTodos } from "../../api/Todo/get_todo";
import { useAppSelector } from "../../hooks";
import OverdueTodoCard from "./OverdueTodoCard";

/* FETCH AND DISPLAY OVERDUE TODOS */
const OverdueTodos: React.FC = () => {
  const token = useAppSelector((state) => state.token.token);
  const [overdueTodos, setOverdueTodos] = useState([]);
  /* GET OVERDUE TODOS */
  const { isLoading, data } = useGetOverdueTodos(token);

  useEffect(() => {
    if (data) setOverdueTodos(data.data);
  }, [data]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Box p={10}>
      <HStack overflow={"hidden"} justify={"space-between"}>
        <Heading fontSize={15}>Overdue</Heading>
        <Text color={"red"}>Reschedule</Text>
      </HStack>
      <Divider py={2} />
      {overdueTodos.map((elem, index) => {
        return <OverdueTodoCard todo={elem} key={index} />;
      })}
    </Box>
  );
};

export default OverdueTodos;
