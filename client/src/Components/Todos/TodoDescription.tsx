import {
  Box,
  Button,
  Divider,
  Grid,
  HStack,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import toast from "react-hot-toast";
import { BsCheck2 } from "react-icons/bs";
import DeleteEditButtons from "../Buttons/DeleteEditButtons";
import { BsFillCalendarXFill } from "react-icons/bs";

interface TodoDescriptionProps {
  isOpen: boolean;
  onClose: () => void;
  todo: {
    _id: string;
    todoName: string;
    dueDate: string;
    isCompleted: boolean;
    todoDescription: string;
  };
}

const TodoDescription: React.FC<TodoDescriptionProps> = ({
  isOpen,
  onClose,
  todo,
}) => {
  const { todoName, todoDescription, dueDate, isCompleted } = todo;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Grid p={5} templateColumns={"20px 10fr"}>
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
            <Text fontSize={22} fontWeight={"bold"}>
              {todoName}
            </Text>
            <Text>{todoDescription}</Text>
            <Button
              leftIcon={<BsFillCalendarXFill />}
              mt={10}
              variant={"outline"}
              size={"sm"}
              color={"red"}
              fontWeight={"normal"}
            >
              Yesterday
            </Button>
            <HStack justify={"flex-end"}>
              <DeleteEditButtons todoId={todo._id} />
            </HStack>
          </Box>
        </Grid>
        <ModalCloseButton />
        <Divider mb={5} w="90%" mx="auto" />
      </ModalContent>
    </Modal>
  );
};

export default TodoDescription;
