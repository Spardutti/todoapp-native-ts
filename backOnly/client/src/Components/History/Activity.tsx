import { Box, Button, Center, HStack, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useGetLatestTodos } from "../../api/Todo/get_todo";
import { useAppSelector } from "../../hooks";
import { Todo } from "../../Interface/Interface";
import Completed from "./Completed";
import LatestCard from "./LatestCard";

interface CompletedTodosProps {}

const LatestActivity: React.FC<CompletedTodosProps> = () => {
  const token = useAppSelector((state) => state.token.token);
  const [fetchData, setFetchData] = useState({
    token: token,
    skipNumber: "0",
  });

  const { data, isLoading, refetch, isFetching } = useGetLatestTodos(fetchData);

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

  const NavButtons = () => {
    if (fetchData.skipNumber === "0") {
      return (
        <Button
          isLoading={isFetching}
          colorScheme={"green"}
          onClick={fetchMore}
          size={"sm"}
        >
          Next page
        </Button>
      );
    }
    if (data?.data.length === 5) {
      return (
        <HStack w={400} justify="space-around">
          <Button
            isLoading={isFetching}
            colorScheme={"red"}
            onClick={fetchLess}
            size={"sm"}
          >
            Prev page
          </Button>
          <Button
            isLoading={isFetching}
            colorScheme={"green"}
            onClick={fetchMore}
            size={"sm"}
          >
            Next page
          </Button>
        </HStack>
      );
    } else {
      return (
        <>
          <Button
            isLoading={isFetching}
            colorScheme={"red"}
            onClick={fetchLess}
            size={"sm"}
          >
            Prev page
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
      {data?.data.length === 0 ? (
        <Center>
          <Text>No more data to display</Text>
        </Center>
      ) : (
        data?.data.map((todo: Todo) => (
          <LatestCard key={todo._id} todo={todo} />
        ))
      )}
      <Center pt={10}>
        <NavButtons />
      </Center>
      <Completed />
    </Box>
  );
};

export default LatestActivity;
