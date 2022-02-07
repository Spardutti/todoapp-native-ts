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
import { BsCheck2 } from "react-icons/bs";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import TodoDescription from "../Todos/TodoDescription";
import DeleteEditButtons from "../Buttons/DeleteEditButtons";
import { DateTime } from "luxon";

interface OverdueTodoCardProps {
  todo: {
    _id: string;
    todoName: string;
    dueDate: string;
    isCompleted: boolean;
    todoDescription: string;
  };
}

/* DISPLAY THE OVERDUE CARD  */
const OverdueTodoCard: React.FC<OverdueTodoCardProps> = ({ todo }) => {
  const [monthName] = useState(DateTime.now().monthShort);
  const [dayNumber] = useState(DateTime.now().day);

  const [show, setShow] = useState<string>("0");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const MotionHStack = motion(HStack);

  return (
    <Box
      onMouseEnter={() => {
        setShow("1");
      }}
      onMouseLeave={() => setShow("0")}
      cursor={"pointer"}
    >
      <Grid py={4} templateColumns={"20px 11fr 1fr"}>
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
            <BsCheck2
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
        <MotionHStack
          initial={{ opacity: 0 }}
          animate={{ opacity: show }}
          align={"flex-start"}
        >
          <DeleteEditButtons todoId={todo._id} />
        </MotionHStack>
      </Grid>
      <Divider />
      {isOpen ? (
        <TodoDescription todo={todo} isOpen={isOpen} onClose={onClose} />
      ) : null}
    </Box>
  );
};

export default OverdueTodoCard;
