import { Box, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useGetTodosByDate, useGetUserTodos } from "../../api/Todo/get_todo";
import toast from "react-hot-toast";
import { useAppSelector } from "../../hooks";
import { Token } from "../../store/Reducers/Token/tokenReducer";
import { stringify } from "querystring";

interface TodayProps {}

const Today: React.FC<TodayProps> = () => {
  const token = useAppSelector((state) => state.token.token);
  // const { isLoading, data, error } = useGetUserTodos(token);

  const fechaDeHoy = new Date().toISOString().split("T")[0];

  const info = {
    date: fechaDeHoy,
    token,
  };
  const { isLoading, data, refetch } = useGetTodosByDate(info);

  if (isLoading) return <p>Loading</p>;

  return (
    <Stack>
      <Text onClick={() => refetch()}>Test</Text>
    </Stack>
  );
};

export default Today;
