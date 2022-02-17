import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import LatestActivity from "../History/Activity";

interface CompletedProps {}

const History: React.FC<CompletedProps> = () => {
  return (
    <Box px={20}>
      <Heading fontSize={25} pt={20}>
        Activity
      </Heading>
      <Box py={10}>
        <LatestActivity />
      </Box>
    </Box>
  );
};

export default History;
