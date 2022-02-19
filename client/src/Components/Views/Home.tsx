import { Box, Heading } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useState } from "react";
import Today from "../Today/Today";
import Layout from "../Layout/Layout";

export const Home = () => {
  const [currentDate] = useState(DateTime.now());

  return (
    <Layout>
      <Heading fontSize={20} px={10}>
        Today{" "}
        <span style={{ fontSize: "12px", color: "gray", fontWeight: "normal" }}>
          {currentDate.weekdayShort} {currentDate.monthShort} {currentDate.day}
        </span>
      </Heading>
      <Box mx="auto">
        <Today />
      </Box>
    </Layout>
  );
};
