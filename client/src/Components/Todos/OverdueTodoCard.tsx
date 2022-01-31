import { Box, Divider, HStack, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsFillCalendarXFill } from "react-icons/bs";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

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

  return (
    <Box>
      <HStack py={4}>
        <Stack
          justifyContent={"center"}
          align={"center"}
          border={"1px"}
          borderColor={"gray"}
          borderRadius={"3xl"}
          w={4}
          h={4}
          mb={10}
          cursor={"pointer"}
        >
          <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}>
            <AiOutlineCheckCircle
              onClick={() => toast("Task completed will be added later")}
            />
          </motion.div>
        </Stack>
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
      </HStack>
      <Divider />
    </Box>
  );
};

export default OverdueTodoCard;
