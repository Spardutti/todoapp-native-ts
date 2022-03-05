import axios from "axios";
import { useQuery } from "react-query";
import url from "../url";

/* GET TODAY AND OLDERS TODOS */
const getTodaysTodos = (token: string) => {
  try {
    const response = axios.get(`${url}/todaystodos`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error;
  }
};

const useGetTodaysTodos = (token: string) => {
  return useQuery<any, any, any>(["today", token], () => getTodaysTodos(token));
};

/* GET UPCOMING TODOS */
const getUpcomingTodos = (token: string) => {
  try {
    const response = axios.get(`${url}/upcomingtodos`, {
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
    const response = axios.get(`${url}/overduetodos`, {
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
  return axios.get(`${url}/todos/${category}`);
};

const useGetTodosByCategory = (category: string | undefined) => {
  return useQuery(["todosCategory", category], () =>
    getTodosByCategory(category)
  );
};

/* GET COMPLETED TODOS */
const getCompletedTodos = (token: string) => {
  return axios.get(`${url}/completed`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const useGetCompletedTodos = (token: string) => {
  return useQuery(["completed", token], () => getCompletedTodos(token));
};

/* GET LATEST TODOS */
const getLatesTodos = (data: { token: string; skipNumber: string }) => {
  return axios.get(`${url}/history/${data.skipNumber}`, {
    headers: { Authorization: `Bearer ${data.token}` },
  });
};

const useGetLatestTodos = (data: { token: string; skipNumber: string }) => {
  return useQuery(["latest", data.token], () => getLatesTodos(data), {
    keepPreviousData: true,
  });
};
export {
  useGetTodaysTodos,
  useGetUpcomingTodos,
  useGetOverdueTodos,
  useGetTodosByCategory,
  useGetCompletedTodos,
  useGetLatestTodos,
};
