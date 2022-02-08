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
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { useDeleteTodo } from "../../api/Todo/delete_todo";

interface DeleteEditButtonsProps {
  todoId: string;
  todoName: string;
}

/* RENDERS TODOCARD BUTTONS FOR EDIT AND DELETE */
const DeleteEditButtons: React.FC<DeleteEditButtonsProps> = ({
  todoId,
  todoName,
}) => {
  const { isLoading, mutateAsync } = useDeleteTodo(todoId);

  const { isOpen, onOpen, onClose } = useDisclosure();

  /* DELETE TODO */
  const deleteTodo = async () => {
    await mutateAsync();
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
                Are you sure you want to delete <b>{todoName}</b> ?
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
        id={todoId}
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
        cursor={"pointer"}
        _hover={{ background: "#dcdbdb" }}
        p={1}
        borderRadius={5}
        color="#202020"
        fontSize={20}
      >
        <BsPencil />
        <ConfirmDelete />
      </Box>
    </>
  );
};

export default DeleteEditButtons;
