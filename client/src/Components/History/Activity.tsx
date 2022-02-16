import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useGetLatestTodos } from "../../api/Todo/get_todo";
import { useAppSelector } from "../../hooks";
import { Todo } from "../../Interface/Interface";
import LatestCard from "./LatestCard";

interface CompletedTodosProps {}

const LatestActivity: React.FC<CompletedTodosProps> = () => {
  const token = useAppSelector((state) => state.token.token);

  const { data, isLoading } = useGetLatestTodos(token);

  if (isLoading) return <p>Loading</p>;

  return (
    <Box>
      {data?.data.map((todo: Todo) => (
        <LatestCard key={todo._id} todo={todo} />
      ))}
    </Box>
  );
};

export default LatestActivity;
