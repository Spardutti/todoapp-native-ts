import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { useGetCompletedTodos } from "../../api/Todo/get_todo";
import { useAppSelector } from "../../hooks";
import { Todo } from "../../Interface/Interface";
import LoadingSpinner from "../Buttons/LoadingSpinner";
import Layout from "../Layout/Layout";
import CompletedTodo from "./CompletedTodo";

interface CompletedProps {}

const Completed: React.FC<CompletedProps> = () => {
  const token = useAppSelector((state) => state.token.token);

  const { data, isLoading } = useGetCompletedTodos(token);

  if (isLoading) return <LoadingSpinner />;

  if (data?.data.length === 0) return null;

  return (
    <Layout>
      <Heading pb={10} fontSize={16}>
        Completed
      </Heading>
      <Box w={"100%"} maxW={800}>
        {data?.data.map((todo: Todo) => (
          <CompletedTodo key={todo._id} todo={todo} />
        ))}
      </Box>
    </Layout>
  );
};

export default Completed;
