import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { Todo } from "../../Interface/Interface";
import { DateTime } from "luxon";
import { AiOutlineDelete } from "react-icons/ai";
import { useDeleteTodo } from "../../api/Todo/delete_todo";
import { useQueryClient } from "react-query";
import toast from "react-hot-toast";

interface LatestCardProps {
  todo: Todo;
}

const CompletedTodo: React.FC<LatestCardProps> = ({ todo }) => {
  const queryClient = useQueryClient();
  const { isOpen, onClose, onOpen } = useDisclosure();

  /* DISPLAY A CONFIRMATION MODAL */
  const ConfirmDelete = () => {
    const { mutateAsync } = useDeleteTodo(todo._id);

    /* DELETE TODO */
    const deleteTodo = async () => {
      await mutateAsync();
      toast.success("Task deleted!");
      queryClient.invalidateQueries("completed");
      queryClient.invalidateQueries("latest");
    };

    /* RENDER */
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} isCentered>
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalBody p={5} boxShadow={"dark-sm"}>
              <Text>
                Are you sure you want to delete <b>{todo.todoName}</b> ?
              </Text>
              <Text color="red">Warning! this is permanent!</Text>
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

  /* SHOW COMPLETED BADGE */
  const AvatarDisplay = () => {
    return (
      <HStack>
        <Avatar
          name={todo.author.username}
          size={"md"}
          src="#"
          bg="white"
          border="2px"
          color={"green.400"}
        >
          <AvatarBadge
            color="white"
            boxSize={"1.25em"}
            bg="green"
            border="none"
          >
            <AiOutlineCheck />
          </AvatarBadge>
        </Avatar>
        <Box>
          <Text fontSize={13}>
            <b>You</b> completed task:{" "}
            <span style={{ color: "gray" }}>{todo.todoName}</span>
          </Text>
          <Text color="gray" fontSize={11}>
            {DateTime.fromISO(todo.updated).monthShort}{" "}
            {DateTime.fromISO(todo.updated).day}
          </Text>
        </Box>
      </HStack>
    );
  };

  return (
    <Grid
      templateColumns={" 8fr 2fr"}
      borderTop={"1px"}
      borderBottom="1px"
      py={2}
      borderColor="gray.100"
      h={70}
    >
      <AvatarDisplay />

      <Flex align={"center"}>
        <Button onClick={onOpen} size="sm" colorScheme={"red"}>
          <AiOutlineDelete />
        </Button>
      </Flex>
      {isOpen && <ConfirmDelete />}
    </Grid>
  );
};

export default CompletedTodo;
