import { Box, Divider, Heading, HStack } from "@chakra-ui/react";
import React, { useState } from "react";
import TodoCard from "../Todos/TodoCard";

interface TodosProps {
  todo: never[];
}

const Todos: React.FC<TodosProps> = ({ todo }) => {
  const [currentDate] = useState(new Date(Date.now()));
  const [month] = useState(
    currentDate.toLocaleString("default", { month: "short" })
  );
  const [day] = useState(
    currentDate.toLocaleDateString("default", { day: "2-digit" })
  );

  return (
    <Box mt={10} maxW={500}>
      <HStack overflow={"hidden"} justify={"space-between"}>
        <Heading fontSize={15}>
          {month} {day} - Today
        </Heading>
      </HStack>
      <Divider py={2} />
      {todo.map((elem, index) => {
        return <TodoCard todo={elem} key={index} />;
      })}
    </Box>
  );
};

export default Todos;
