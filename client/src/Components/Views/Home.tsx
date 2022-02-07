import { Box, Heading } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useState } from "react";
import Today from "../Today/Today";

export const Home = () => {
  const [currentDate] = useState(DateTime.now());

  return (
    <Box>
      <Heading fontSize={25} pt={20} px={10}>
        Today{" "}
        <span style={{ fontSize: "13px", color: "gray", fontWeight: "normal" }}>
          {currentDate.weekdayShort} {currentDate.monthShort} {currentDate.day}
        </span>
      </Heading>
      <Box mx="auto">
        <Today />
      </Box>
    </Box>
  );
};
