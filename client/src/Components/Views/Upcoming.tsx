import { Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import WeekDisplay from "../Upcoming/WeekDisplay";

interface UpcomingProps {}

/* SHOW UPCOMING TODOS */
const Upcoming: React.FC<UpcomingProps> = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [value, onChange] = useState(new Date());

  return (
    <Stack p={0}>
      <WeekDisplay />
    </Stack>
  );
};

export default Upcoming;
