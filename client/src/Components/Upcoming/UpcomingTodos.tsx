import React, { useEffect, useState } from "react";
import { useGetUpcomingTodos } from "../../api/Todo/get_todo";
import { useAppSelector } from "../../hooks";

interface UpcomingTodosProps {}

const UpcomingTodos: React.FC<UpcomingTodosProps> = () => {
  const token = useAppSelector((state) => state.token.token);
  const [days, setDays] = useState([]);

  const { data: upcoming, isLoading } = useGetUpcomingTodos(token);

  if (isLoading) return <p>isLoading</p>;

  return (
    <div>
      <p>upcomings</p>
    </div>
  );
};

export default UpcomingTodos;
