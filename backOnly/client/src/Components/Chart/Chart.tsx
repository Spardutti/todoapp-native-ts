import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
import {
  useGetCompletedTodos,
  useGetOverdueTodos,
  useGetUpcomingTodos,
} from "../../api/Todo/get_todo";
import { useAppSelector } from "../../hooks";

interface ChartProps {}
/* DISPLAYS A PIE CHART WITH TODOS INFORMATION */
const Chart: React.FC<ChartProps> = () => {
  const token = useAppSelector((state) => state.token.token);
  const [todosData, setTodosData] = useState({
    overdue: 0,
    upcoming: 0,
    completed: 0,
  });

  const { data: upcoming } = useGetUpcomingTodos(token);
  const { data: overdue } = useGetOverdueTodos(token);
  const { data: completed, isLoading } = useGetCompletedTodos(token);

  useEffect(() => {
    if (overdue && upcoming && completed) {
      setTodosData({
        ...todosData,
        overdue: overdue.data.length,
        upcoming: upcoming.data.length,
        completed: completed.data.length,
      });
    }
  }, [overdue, upcoming, completed]);

  if (isLoading) return <p>Loading</p>;

  ChartJS.register(ArcElement, Tooltip, Legend, Title);
  const data = {
    labels: [`Completed`, `Overdue`, `Pending`],
    datasets: [
      {
        label: "# of Tasks",
        data: [todosData.completed, todosData.overdue, todosData.upcoming],
        backgroundColor: ["#2ECC40", "#FF4136", "#FFDC00"],

        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Stats",
      },
      legend: {
        labels: {
          boxWidth: 10,
          cursor: "pointer",
        },
      },
    },
  };

  return (
    <Flex mx="auto" justify={"center"} align="center" w={300} h={300}>
      <Box>{todosData ? <Pie data={data} options={options} /> : null}</Box>
    </Flex>
  );
};

export default Chart;
