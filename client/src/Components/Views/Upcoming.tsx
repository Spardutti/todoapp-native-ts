import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import Layout from "../Layout/Layout";
import WeekDisplay from "../Upcoming/WeekDisplay";

interface UpcomingProps {}

/* SHOW UPCOMING TODOS */
const Upcoming: React.FC<UpcomingProps> = () => {
  return (
    <Layout>
      <Box>
        <WeekDisplay />
      </Box>
    </Layout>
  );
};

export default Upcoming;
