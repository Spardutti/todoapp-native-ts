import {
  Box,
  Divider,
  Grid,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsCheck2 } from "react-icons/bs";
import { BsFillCalendarXFill } from "react-icons/bs";
import TodoDescription from "./TodoDescription";
import DeleteEditButtons from "../Buttons/DeleteEditButtons";

interface TodoCardProps {
  todo: {
    _id: string;
    todoName: string;
    dueDate: string;
    isCompleted: boolean;
    todoDescription: string;
  };
}

const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
  const [monthName] = useState(
    new Date(todo.dueDate).toLocaleString("default", {
      month: "short",
      timeZone: "Greenwich",
    })
  );

  const [dayNumber] = useState(
    new Date(todo.dueDate).toLocaleString("default", {
      day: "2-digit",
      timeZone: "Greenwich",
    })
  );

  const [show, setShow] = useState<string>("0");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const MotionHStack = motion(HStack);

  return (
    <Box
      onMouseEnter={() => setShow("1")}
      onMouseLeave={() => setShow("0")}
      cursor={"pointer"}
    >
      <Grid templateColumns={"20px 11fr 1fr"} py={4}>
        <Stack
          display={"inline-block"}
          justifyContent={"center"}
          align={"center"}
          border={"1px"}
          borderColor={"gray"}
          borderRadius={"3xl"}
          w={4}
          h={4}
          mt={1}
          cursor={"pointer"}
        >
          <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}>
            <BsCheck2
              onClick={() => toast("Task completed will be added later")}
            />
          </motion.div>
        </Stack>
        <Box py={0} onClick={onOpen}>
          <Box>
            <Text>{todo.todoName}</Text>
            <Text fontSize={10} color={"gray"}>
              {todo.todoDescription}
            </Text>
            <HStack color={"red.500"} fontSize={12}>
              <BsFillCalendarXFill />
              <Text>{monthName}</Text>
              <Text>{dayNumber}</Text>
            </HStack>
          </Box>
        </Box>
        <MotionHStack
          initial={{ opacity: 0 }}
          animate={{ opacity: show }}
          align={"flex-start"}
        >
          <DeleteEditButtons todoId={todo._id} todoName={todo.todoName} />
        </MotionHStack>
      </Grid>
      <Divider />
      {isOpen ? (
        <TodoDescription todo={todo} isOpen={isOpen} onClose={onClose} />
      ) : null}
    </Box>
  );
};

export default TodoCard;
