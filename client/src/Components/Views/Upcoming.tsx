import React from "react";
import Layout from "../Layout/Layout";
import WeekDisplay from "../Upcoming/WeekDisplay";

/* SHOW UPCOMING TODOS */
const Upcoming: React.FC = () => {
  return (
    <Layout>
      <WeekDisplay />
    </Layout>
  );
};

export default Upcoming;
