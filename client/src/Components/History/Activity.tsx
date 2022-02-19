import { Box, Button, Center, HStack, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useGetLatestTodos } from "../../api/Todo/get_todo";
import { useAppSelector } from "../../hooks";
import { Todo } from "../../Interface/Interface";
import LatestCard from "./LatestCard";

interface CompletedTodosProps {}

const LatestActivity: React.FC<CompletedTodosProps> = () => {
  const token = useAppSelector((state) => state.token.token);
  const [fetchData, setFetchData] = useState({
    token: token,
    skipNumber: "0",
  });
  const [todos, setTodos] = useState<Todo[]>([]);

  const { data, isLoading, refetch } = useGetLatestTodos(fetchData);

  const fetchMore = () => {
    let skipable = Number(fetchData.skipNumber);
    skipable = skipable + 5;
    setFetchData({
      ...fetchData,
      skipNumber: skipable.toString(),
    });
  };

  const fetchLess = () => {
    let skipable = Number(fetchData.skipNumber);
    skipable = skipable - 5;
    setFetchData({
      ...fetchData,
      skipNumber: skipable.toString(),
    });
  };

  useEffect(() => {
    refetch();
  }, [fetchData]);

  useEffect(() => {
    setTodos(data?.data);
  }, [data]);

  const NavButtons = () => {
    if (fetchData.skipNumber === "0") {
      return (
        <Button colorScheme={"green"} onClick={fetchMore}>
          More
        </Button>
      );
    }
    if (todos.length === 5) {
      return (
        <HStack w={400} justify="space-around">
          <Button colorScheme={"red"} onClick={fetchLess}>
            Less
          </Button>
          <Button colorScheme={"green"} onClick={fetchMore}>
            More
          </Button>
        </HStack>
      );
    } else {
      return (
        <>
          <Button colorScheme={"red"} onClick={fetchLess}>
            Less
          </Button>
        </>
      );
    }
  };

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <Box>
      {todos &&
        todos.map((todo: Todo) => <LatestCard key={todo._id} todo={todo} />)}
      <Center pt={10}>
        <NavButtons />
      </Center>
    </Box>
  );
};

export default LatestActivity;
