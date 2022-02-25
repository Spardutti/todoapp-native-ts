import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { useQueryClient } from "react-query";
import { useDeleteTodo } from "../../api/Todo/delete_todo";
import { Todo } from "../../Interface/Interface";
import EditTodo from "./EditButtonInfo";

interface DeleteEditButtonsProps {
  todo: Todo;
}

/* RENDERS TODOCARD BUTTONS FOR EDIT AND DELETE */
const DeleteEditButtons: React.FC<DeleteEditButtonsProps> = ({ todo }) => {
  const { isLoading, mutateAsync } = useDeleteTodo(todo._id);
  //const [ preSelectedCategory, setPreSelectedCategory] = useState({categoryName: "", color:""})
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const queryClient = useQueryClient();

  /* DELETE TODO */
  const deleteTodo = async () => {
    await mutateAsync();
    queryClient.invalidateQueries("today");
    queryClient.invalidateQueries("upcoming");
    queryClient.invalidateQueries("overdue");
    queryClient.invalidateQueries("completed");
    queryClient.invalidateQueries("latest");

    onClose();
  };

  /* DISPLAY A CONFIRMATION MODAL */
  const ConfirmDelete = () => {
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} isCentered>
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalBody p={5} boxShadow={"dark-sm"}>
              <Text>
                Are you sure you want to delete <b>{todo.todoName}</b> ?
              </Text>
              <Flex justify={"flex-end"} p={5}>
                <Button size={"sm"} variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  size={"sm"}
                  mx={5}
                  colorScheme="red"
                  onClick={deleteTodo}
                >
                  Delete
                </Button>
              </Flex>
            </ModalBody>
            <ModalCloseButton />
          </ModalContent>
        </Modal>
      </>
    );
  };

  return (
    <>
      <Box
        onClick={onOpen}
        id={todo._id}
        _hover={{ background: "#dcdbdb" }}
        p={1}
        borderRadius={5}
        color="#202020"
        fontSize={20}
        cursor={"pointer"}
      >
        {isLoading ? <Spinner /> : <AiOutlineDelete />}
      </Box>
      <Box
        onClick={onEditOpen}
        cursor={"pointer"}
        _hover={{ background: "#dcdbdb" }}
        p={1}
        borderRadius={5}
        color="#202020"
        fontSize={20}
      >
        <BsPencil />
      <EditTodo
        isOpen={isEditOpen}
        onClose={onEditClose}
        todo={todo}
        //preSelectedCategory={preSelectedCategory}
      />
      </Box>
      <ConfirmDelete />
    </>
  );
};

export default DeleteEditButtons;
