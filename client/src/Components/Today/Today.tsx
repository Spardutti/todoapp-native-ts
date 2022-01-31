import { Box, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useGetTodaysTodos } from "../../api/Todo/get_todo";
import toast from "react-hot-toast";
import { useAppSelector } from "../../hooks";
import { Token } from "../../store/Reducers/Token/tokenReducer";

interface TodayProps {}

const Today: React.FC<TodayProps> = () => {
  const token = useAppSelector((state) => state.token.token);
  const [todayTodos, setTodayTodos] = useState([]);
  const [olderTodos, setOlderTodos] = useState([]);
  const { isLoading, data, refetch } = useGetTodaysTodos(token);

  if (isLoading) return <p>Loading</p>;

  return (
    <Stack>
      <Text onClick={() => refetch()}>Test</Text>
    </Stack>
  );
};

export default Today;
