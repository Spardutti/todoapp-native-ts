import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import LatestActivity from "../History/Activity";
import Layout from "../Layout/Layout";

interface CompletedProps {}

const History: React.FC<CompletedProps> = () => {
  return (
    <Layout>
      <Heading px={10} fontSize={16}>
        Activity
      </Heading>
      <Box p={10} my={2} w="100%" maxW={800}>
        <LatestActivity />
      </Box>
    </Layout>
  );
};

export default History;
