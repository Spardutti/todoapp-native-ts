import React from "react";
import Layout from "../Layout/Layout";
import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { AddedFriends } from "../Friends/AddedFriends";
import { SentFriendRequests } from "../Friends/SentFriendRequests";
import { ReceivedFriendRequests } from "../Friends/ReceivedFriendRequests";

export const Friends: React.FC = () => {
  return (
    <Layout>
      <Flex direction="row" justifyContent="space-around" width="80%">
        <Box width="45%">
          <AddedFriends />
        </Box>
        <Box width="45%">
          <SentFriendRequests />
          <Divider variant={"solid"} />
          <ReceivedFriendRequests />
        </Box>
      </Flex>
    </Layout>
  );
};
