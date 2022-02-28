import { Box } from "@chakra-ui/react";

import Today from "../Today/Today";
import Layout from "../Layout/Layout";

export const Home = () => {
  return (
    <Layout>
      <Box mx="auto" w="100%" maxW={800}>
        <Today />
      </Box>
    </Layout>
  );
};
