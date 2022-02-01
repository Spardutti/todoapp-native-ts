import { Box, Heading, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface UpcomingProps {}

/* SHOW UPCOMING TODOS */
const Upcoming: React.FC<UpcomingProps> = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [value, onChange] = useState(new Date());

  useEffect(() => {
    const currentMonth = new Date(Date.now()).toLocaleString("default", {
      month: "long",
    });
    setMonth(currentMonth);
    const currentYear = new Date(Date.now()).toLocaleString("default", {
      year: "numeric",
    });
    setYear(currentYear);
  }, []);

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <Stack p={10}>
      <Heading fontSize={25} mb={10} cursor={"pointer"}>
        {month} {year}
        {/* <span style={{ fontSize: "13px", color: "gray", fontWeight: "normal" }}>
          {currentDate.toLocaleString("default", { weekday: "short" })}{" "}
          {currentDate.toLocaleString("default", { month: "short" })}{" "}
          {currentDate.toLocaleDateString("default", { day: "numeric" })}
        </span> */}
      </Heading>
      <Box w={200} fontSize={8}>
        <Calendar onChange={onChange} value={value} />
      </Box>
    </Stack>
  );
};

export default Upcoming;

/*  */
