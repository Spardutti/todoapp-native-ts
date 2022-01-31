import {
  Box,
  Divider,
  Grid,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsFillCalendarXFill } from "react-icons/bs";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import TodoDescription from "./TodoDescription";

interface OverdueTodoCardProps {
  todo: {
    _id: string;
    todoName: string;
    dueDate: string;
    isCompleted: boolean;
    todoDescription: string;
  };
}

const OverdueTodoCard: React.FC<OverdueTodoCardProps> = ({ todo }) => {
  const [monthName] = useState(
    new Date(todo.dueDate).toLocaleString("default", { month: "short" })
  );
  const [dayNumber] = useState(
    new Date(todo.dueDate).toLocaleString("default", {
      day: "2-digit",
    })
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Grid py={4} templateColumns={"20px 1fr"}>
        <Stack
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
            <AiOutlineCheckCircle
              onClick={() => toast("Task completed will be added later")}
            />
          </motion.div>
        </Stack>
        <Box onClick={onOpen}>
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
      </Grid>
      <Divider />
      <TodoDescription isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default OverdueTodoCard;
