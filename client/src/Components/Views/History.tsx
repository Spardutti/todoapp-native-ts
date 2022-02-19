import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import LatestActivity from "../History/Activity";
import Layout from "../Layout/Layout";

interface CompletedProps {}

const History: React.FC<CompletedProps> = () => {
  return (
    <Layout>
      <Heading fontSize={25}>Activity</Heading>
      <Box py={10} my={2}>
        <LatestActivity />
      </Box>
    </Layout>
  );
};

export default History;
