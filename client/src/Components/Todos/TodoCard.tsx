import {
  Box,
  Divider,
  Grid,
  HStack,
  Link,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsCheck2 } from "react-icons/bs";
import { BsFillCalendarXFill } from "react-icons/bs";
import TodoDescription from "./TodoDescription";
import DeleteEditButtons from "../Buttons/DeleteEditButtons";
import { Link as RouterLink } from "react-router-dom";
import { useToggleIsCompelted } from "../../api/Todo/put_todo";
import { useQueryClient } from "react-query";
import { Todo } from "../../Interface/Interface";

/* RENDERS A TODO CARD WITH PROPS */
const TodoCard: React.FC<{ todo: Todo }> = ({ todo }) => {
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

  const [show, setShow] = useState(false);

  /* CHECK IF MOBILE OR DESKTOP */
  useEffect(() => {
    if (window.innerWidth <= 600) setShow(true);
  }, []);

  const { isOpen, onClose } = useDisclosure();

  /* COMPLETE THE TASK */
  const { mutateAsync } = useToggleIsCompelted();

  const queryClient = useQueryClient();

  /* UPDATE COMPLETED TO TRUE OR FALSE */
  const updateIsCompleted = async (data: { id: string; status: boolean }) => {
    const response = await mutateAsync(data);
    if (response) {
      queryClient.invalidateQueries("todosCategory");
      queryClient.invalidateQueries("overdue");
      queryClient.invalidateQueries("today");
      queryClient.invalidateQueries("upcoming");
    }
    toast.success("Task updated sucessfully");
  };

  const MotionHStack = motion(HStack);

  return (
    <Box
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      cursor={"pointer"}
    >
      <Grid templateColumns={"20px 10fr 2fr"} py={1}>
        <Stack
          display={"inline-block"}
          justifyContent={"center"}
          align={"center"}
          border={"1px"}
          borderColor={"gray"}
          borderRadius={"3xl"}
          w={[3, 4]}
          h={[3, 4]}
          mt={1}
          cursor={"pointer"}
        >
          <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}>
            <BsCheck2
              onClick={() =>
                updateIsCompleted({ id: todo._id, status: todo.isCompleted })
              }
            />
          </motion.div>
        </Stack>
        <Box py={0} /* onClick={onOpen} */>
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
        <VStack>
          <MotionHStack align={"flex-start"} h={5}>
            {show ? (
              <DeleteEditButtons
                todoId={todo._id}
                todoName={todo.todoName}
                todo={todo}
              />
            ) : null}
          </MotionHStack>
          <Box>
            <Link
              fontSize={14}
              color={todo.category.color}
              as={RouterLink}
              to={`/category/${todo.category._id}`}
            >
              {todo.category.categoryName}
            </Link>
          </Box>
        </VStack>
      </Grid>
      <Divider w="100%" />
      {isOpen ? (
        <TodoDescription todo={todo} isOpen={isOpen} onClose={onClose} />
      ) : null}
    </Box>
  );
};

export default TodoCard;
