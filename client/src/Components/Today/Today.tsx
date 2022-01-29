import { Box, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useGetTodos } from "../../api/Todo/get_todo";
import toast, { Toaster } from "react-hot-toast";

interface TodayProps {
  userId: string;
}

const Today: React.FC<TodayProps> = ({ userId }) => {
  const [enableRefetch, setEnableRefetch] = useState(false);
  const { isLoading, data, error, refetch } = useGetTodos({
    userId,
    enableRefetch,
  });

  /* useEffect(() => {
    refetch();
  }, []); */

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong. Please try again");
    }
  }, [error]);

  if (isLoading) return <p>Loading</p>;

  return (
    <Stack>
      <Toaster />
      <Text>Test</Text>
    </Stack>
  );
};

export default Today;
