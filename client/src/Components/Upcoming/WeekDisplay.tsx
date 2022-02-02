import React, { useEffect, useState } from "react";
import { DateTime, Info } from "luxon";

interface WeekDisplayProps {}

const WeekDisplay: React.FC<WeekDisplayProps> = () => {
  const [weekToShow, setWeekToShow] = useState();

  useEffect(() => {
    const today = DateTime.now();
    let firstDay = today.startOf("week");

    const week = [];

    /*     for (let i = 0; i < 6; i++) {
      const dt = DateTime.fromObject({
        year: today.year,
        day: firstDay,
        month: today.month,
      });
      firstDay++;
      week.push(dt.toLocaleString());
    } */

    console.log(firstDay.toISO());
  }, []);
  return (
    <div>
      <p>week</p>
    </div>
  );
};

export default WeekDisplay;
