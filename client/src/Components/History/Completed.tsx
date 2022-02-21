import { Heading } from "@chakra-ui/react";
import React from "react";
import { useGetCompletedTodos } from "../../api/Todo/get_todo";
import { useAppSelector } from "../../hooks";
import { Todo } from "../../Interface/Interface";
import Layout from "../Layout/Layout";
import CompletedTodo from "./CompletedTodo";
import LatestCard from "./LatestCard";

interface CompletedProps {}

const Completed: React.FC<CompletedProps> = () => {
  const token = useAppSelector((state) => state.token.token);

  const { data, isLoading } = useGetCompletedTodos(token);

  if (isLoading) return <p>loading</p>;

  if (data?.data.length === 0) return null;

  return (
    <Layout>
      <Heading pb={10} fontSize={16}>
        Completed
      </Heading>
      {data?.data.map((todo: Todo) => (
        <CompletedTodo key={todo._id} todo={todo} />
      ))}
    </Layout>
  );
};

export default Completed;
