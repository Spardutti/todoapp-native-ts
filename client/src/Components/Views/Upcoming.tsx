import { Box, Heading, HStack, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import WeekDisplay from "../Upcoming/WeekDisplay";
import "react-calendar/dist/Calendar.css";

interface UpcomingProps {}

/* SHOW UPCOMING TODOS */
const Upcoming: React.FC<UpcomingProps> = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [value, onChange] = useState(new Date());

  return (
    <Stack p={10}>
      <WeekDisplay />
      <Box w={200} fontSize={8}>
        {/* <Calendar onChange={onChange} value={value} /> */}
      </Box>
    </Stack>
  );
};

export default Upcoming;

/*  */
