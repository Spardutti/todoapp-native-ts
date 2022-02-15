import { Box } from "@chakra-ui/react";
import React from "react";
import Chart from "../Chart/Chart";
import OverdueTodos from "../OverdueTodos/OverdueTodos";
import UpcomingTodos from "../Upcoming/UpcomingTodos";

interface CompletedProps {}

const Completed: React.FC<CompletedProps> = () => {
  return (
    <Box pt={20}>
      <Chart />
      <OverdueTodos />
      <UpcomingTodos />
    </Box>
  );
};

export default Completed;
