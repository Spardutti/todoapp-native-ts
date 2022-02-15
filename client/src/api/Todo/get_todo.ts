import axios from "axios";
import { useQuery } from "react-query";

const devUrl = "http://localhost:5000/api";

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

/* GET TODOS BY CATEGORY */
const getTodosByCategory = (category: string | undefined) => {
  return axios.get(`${devUrl}/todos/${category}`);
};

const useGetTodosByCategory = (category: string | undefined) => {
  return useQuery(["todosCategory", category], () =>
    getTodosByCategory(category)
  );
};

/* GET COMPLETED TODOS */
const getCompletedTodos = (token: string) => {
  return axios.get(`${devUrl}/completed`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const useGetCompletedTodos = (token: string) => {
  return useQuery(["completed", token], () => getCompletedTodos(token));
};
export {
  useGetTodaysTodos,
  useGetUpcomingTodos,
  useGetOverdueTodos,
  useGetTodosByCategory,
  useGetCompletedTodos,
};
