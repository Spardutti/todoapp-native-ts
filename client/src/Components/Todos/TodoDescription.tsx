import {
  Box,
  Divider,
  Flex,
  Grid,
  HStack,
  Modal,
  ModalContent,
  ModalOverlay,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { BsCheck2 } from "react-icons/bs";
import DeleteEditButtons from "../Buttons/DeleteEditButtons";
import { BsFillCalendarXFill } from "react-icons/bs";
import { Todo } from "../../Interface/Interface";
import "../../Styles/calendar/calendarButton.scss";

interface TodoDescriptionProps {
  isOpen: boolean;
  onClose: () => void;
  todo: Todo;
}

const TodoDescription: React.FC<TodoDescriptionProps> = ({
  isOpen,
  onClose,
  todo,
}) => {
  const { todoName, todoDescription, dueDate, category } = todo;

  useEffect(() => {
    console.log(new Date(dueDate));
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <Box>
          <Grid px={5} pb={0} templateColumns={"20px 10fr"}>
            <Box
              w={5}
              h={5}
              borderRadius={50}
              border="1px"
              display={"inline-block"}
              justifyContent={"center"}
              align={"center"}
              borderColor={"gray"}
              mt={7}
              cursor={"pointer"}
            >
              <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}>
                <BsCheck2
                  onClick={() => toast("Task completed will be added later")}
                />
              </motion.div>
            </Box>
            <Box p={5}>
              <Text fontSize={22} fontWeight={"bold"} className="cardText">
                {todoName}
              </Text>
              <Text className="cardText">{todoDescription}</Text>
              <Box
                mt={10}
                variant={"outline"}
                size={"sm"}
                color={"red"}
                fontWeight={"normal"}
              >
                <Flex>
                  <Box
                    display="flex"
                    border="1px"
                    borderColor="blackAlpha.400"
                    borderRadius="0.375rem"
                    height="26px"
                    px="7px"
                  >
                    <Flex align="center">
                      <BsFillCalendarXFill />
                    </Flex>
                    <Text textAlign="center" ml="5px" fontSize="sm">
                      {new Date(dueDate).toString().slice(4, 10)}
                    </Text>
                  </Box>
                  <Spacer />
                  <Text
                    color={category.color}
                    fontWeight="bold"
                    className="cardText"
                  >
                    {category.categoryName}
                  </Text>
                </Flex>
              </Box>
              <HStack justify={"flex-end"} mt="10px">
                <DeleteEditButtons
                  todoId={todo._id}
                  todoName={todo.todoName}
                  todo={todo}
                />
              </HStack>
            </Box>
          </Grid>
          <Divider mb={3} w="90%" mx="auto" borderColor="blackAlpha.400" />
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default TodoDescription;
