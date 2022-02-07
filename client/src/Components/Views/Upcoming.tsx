import { Stack } from "@chakra-ui/react";
import React from "react";
import WeekDisplay from "../Upcoming/WeekDisplay";

interface UpcomingProps {}

/* SHOW UPCOMING TODOS */
const Upcoming: React.FC<UpcomingProps> = () => {
  return (
    <Stack>
      <WeekDisplay />
    </Stack>
  );
};

export default Upcoming;
