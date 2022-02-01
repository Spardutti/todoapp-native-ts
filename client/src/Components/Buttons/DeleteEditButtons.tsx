import { Box, Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { TodoApi } from "../../api/Todo/TodoApi";
import { useQueryClient } from "react-query";

interface DeleteEditButtonsProps {
  todoId: string;
}

const DeleteEditButtons: React.FC<DeleteEditButtonsProps> = ({ todoId }) => {
  const { isLoading, mutateAsync } = TodoApi.useDeleteTodo(todoId);

  const queryClient = useQueryClient();

  /* DELETE TODO */
  const deleteTodo = async () => {
    await mutateAsync();
    queryClient.invalidateQueries("todos");
  };

  return (
    <>
      <Box
        onClick={deleteTodo}
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
      </Box>
    </>
  );
};

export default DeleteEditButtons;
