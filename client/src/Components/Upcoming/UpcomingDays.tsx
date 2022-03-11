import { Box, Divider, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { DateTime } from "luxon";
import React, { useState, useEffect } from "react";
import { useGetUpcomingTodos } from "../../api/Todo/get_todo";
import { useAppSelector } from "../../hooks";
import OverdueTodos from "../OverdueTodos/OverdueTodos";
import { AddTodoModal } from "../Todos/AddTodoModal";
import TodoCard from "../Todos/TodoCard";
import { Todo } from "../../Interface/Interface";
import LoadingSpinner from "../Buttons/LoadingSpinner";

interface UpcomingDaysProps {
  selectedDate: DateTime;
}

interface Year {
  year: number;
}

interface Month extends Year {
  month: string;
}

interface Day extends Month {
  day: number;
  weekday: string;
}

/* DISPLAY UPCOMING DAYS*/
const UpcomingDays: React.FC<UpcomingDaysProps> = ({ selectedDate }) => {
  const token = useAppSelector((state) => state.token.token);
  const [upcomingTodos, setUpcomingTodos] = useState<Todo[]>([]);
  const [years, setYears] = useState<Year[]>([]);
  const [months, setMonths] = useState<Month[]>([]);
  const [days, setDays] = useState<Day[]>([]);

  /* GET UPCOMING TODOS */
  const info = { token, selectedDate: selectedDate.toString() };
  const { isLoading, data } = useGetUpcomingTodos(info);

  useEffect(() => {
    if (data) {
      console.log(data.data.length);

      setUpcomingTodos(data.data);
    }
  }, [data]);

  const getUniqueDates = () => {
    const uniqueYears: Year[] = [];
    const uniqueMonths: Month[] = [];
    const uniqueDays: Day[] = [];

    upcomingTodos.map((todo: Todo, index) => {
      const date = DateTime.fromJSDate(new Date(todo.dueDate)).setLocale(
        "en-US"
      );

      const { year, monthLong, weekdayShort, day } = date;
      /* GET UNIQUE YEARS */
      if (uniqueYears.findIndex((elem) => elem.year === year) === -1) {
        uniqueYears.push({ year: year });
      }

      /* GET UNIQUE MONTHS */
      if (uniqueMonths.findIndex((elem) => elem.year === year) === -1) {
        uniqueMonths.push({ year, month: monthLong });
      }
      if (
        uniqueMonths.findIndex((elem) => elem.year === year) > -1 &&
        uniqueMonths.findIndex((elem) => elem.month === monthLong) === -1
      ) {
        uniqueMonths.push({ year, month: monthLong });
      }

      /* GET UNIQUE DAYS */
      if (uniqueDays.findIndex((elem) => elem.year === year) === -1) {
        uniqueDays.push({ year, month: monthLong, day, weekday: weekdayShort });
      }

      if (
        uniqueDays.findIndex((elem) => elem.year === year) > -1 &&
        uniqueDays.findIndex((elem) => elem.month === monthLong) === -1
      ) {
        uniqueDays.push({ year, month: monthLong, day, weekday: weekdayShort });
      }

      if (
        uniqueDays.findIndex((elem) => elem.year === year) > -1 &&
        uniqueDays.findIndex((elem) => elem.month === monthLong) > -1 &&
        uniqueDays.findIndex((elem) => elem.day === day) === -1
      ) {
        uniqueDays.push({ year, month: monthLong, day, weekday: weekdayShort });
      }
      setYears(uniqueYears);
      setMonths(uniqueMonths);
      setDays(uniqueDays);
    });
  };

  useEffect(() => {
    getUniqueDates();
  }, [upcomingTodos]);

  const NoUpcoming = () => (
    <Stack py={10}>
      <Text>Nothing here, go ahead and add something</Text>
      <AddTodoModal preSelectedDate={null} text="Add Task" color="red" />
    </Stack>
  );

  if (isLoading) return <LoadingSpinner />;

  /* RENDER UPCOMING DAYS */
  const DisplayDays = () => {
    return (
      <>
        {upcomingTodos.length === 0 ? <NoUpcoming /> : null}
        {/* RENDER YEARS */}
        {years.map((year, index) => (
          <Box key={index}>
            <Heading fontSize={25} textAlign="center">
              {year.year === DateTime.now().year ? null : year.year}
            </Heading>
            {/* RENDER MONTHS */}
            {months.map((month, index) => {
              if (month.year === year.year) {
                return (
                  <Box key={index}>
                    <Heading
                      fontWeight={"bold"}
                      color="red.500"
                      fontSize={20}
                      py={3}
                    >
                      {month.month}
                    </Heading>
                    {/* RENDERS DAYS */}
                    {days.map((day, index) => {
                      if (day.month === month.month) {
                        return (
                          <Box py={5} key={index}>
                            <Text fontWeight={"semibold"}>
                              {day.weekday} {day.day}
                            </Text>
                            {/* RENDERS TASKS */}
                            {upcomingTodos.map((todo, index) => {
                              const todoDate = DateTime.fromJSDate(
                                new Date(todo.dueDate)
                              ).setLocale("en-US");
                              if (
                                todoDate.monthLong === month.month &&
                                todoDate.day === day.day &&
                                todoDate.year === year.year
                              ) {
                                return <TodoCard todo={todo} key={index} />;
                              }
                            })}
                          </Box>
                        );
                      }
                    })}
                  </Box>
                );
              }
            })}
          </Box>
        ))}
      </>
    );
  };

  return (
    <Box mt={40}>
      <OverdueTodos />
      <DisplayDays />
    </Box>
  );
};

export default UpcomingDays;
