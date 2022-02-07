import axios from "axios";
import { useQuery } from "react-query";

const devUrl = "http://localhost:5000/api";

/* GET ALL USER TODOS */
const getUserTodos = async (token: string) => {
  try {
    const response = axios.get(`${devUrl}/todos`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error;
  }
};

const useGetUserTodos = (token: string) => {
  return useQuery<any, Error>(["todos", token], () => getUserTodos(token));
};

/* GET TODO BY ID */
const getTodo = async (id: string) => {
  try {
    const response = axios.get(`${devUrl}/todo/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

const useGetTodo = (id: string) => {
  return useQuery<any, Error>(["todo", id], () => getTodo(id));
};

/* GET TODOS BY DATE */
const getTodosByDate = (data: { date: string; token: string }) => {
  try {
    const formatDate = data.date;

    const response = axios.get(`${devUrl}/todos/${formatDate}`, {
      headers: { Authorization: `Bearer ${data.token}` },
    });
    return response;
  } catch (error) {
    return error;
  }
};

const useGetTodosByDate = (data: { date: string; token: string }) => {
  return useQuery<any, Error>(["todos", data], () => getTodosByDate(data));
};

/* GET TODAY AND OLDERS TODOS */
const getTodaysTodos = (token: string) => {
  try {
    const response = axios.get(`${devUrl}/todaystodos`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error;
  }
};

const useGetTodaysTodos = (token: string) => {
  return useQuery<any, any, any>(["todos", token], () => getTodaysTodos(token));
};

/* GET UPCOMING TODOS */
const getUpcomingTodos = (token: string) => {
  try {
    const response = axios.get(`${devUrl}/upcomingtodos`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error;
  }
};

const useGetUpcomingTodos = (token: string) => {
  return useQuery<any, any, any>(["upcoming", token], () =>
    getUpcomingTodos(token)
  );
};

/* GET OVERDUE TODOS */
const getOverdueTodos = (token: string) => {
  try {
    const response = axios.get(`${devUrl}/overduetodos`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error;
  }
};

const useGetOverdueTodos = (token: string) => {
  return useQuery<any, any, any>(["overdue", token], () =>
    getOverdueTodos(token)
  );
};
export {
  useGetUserTodos,
  useGetTodo,
  useGetTodosByDate,
  useGetTodaysTodos,
  useGetUpcomingTodos,
  useGetOverdueTodos,
};
