import { Box, Divider, Heading, HStack, Text } from "@chakra-ui/react";
import React from "react";
import OverdueTodoCard from "../Todos/OverdueTodoCard";

interface OverdueTodosProps {
  todo: never[];
}

const OverdueTodos: React.FC<OverdueTodosProps> = ({ todo }) => {
  return (
    <Box pb={10} maxW={500}>
      <HStack overflow={"hidden"} justify={"space-between"}>
        <Heading fontSize={15}>Overdue</Heading>
        <Text color={"red"}>Reschedule</Text>
      </HStack>
      <Divider py={2} />
      {todo.map((elem, index) => {
        return <OverdueTodoCard todo={elem} key={index} />;
      })}
    </Box>
  );
};

export default OverdueTodos;
