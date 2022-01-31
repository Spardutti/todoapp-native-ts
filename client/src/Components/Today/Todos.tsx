import { Box, Button, Divider, Heading, HStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { AddTodoModal } from "../Todos/AddTodoModal";
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
    <Box w={800} pt={10} cursor={"pointer"}>
      <HStack overflow={"hidden"} justify={"space-between"}>
        <Heading fontSize={15}>
          {month} {day} - Today
        </Heading>
      </HStack>
      <Divider py={2} />
      {todo.map((elem, index) => {
        return <TodoCard todo={elem} key={index} />;
      })}
      <Button
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
        <AddTodoModal color={"red"} />
        Add Todo
      </Button>
    </Box>
  );
};

export default Todos;
