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

    const response = axios.get(`${devUrl}/getTodosByDate/${formatDate}`, {
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

export { useGetUserTodos, useGetTodo, useGetTodosByDate };
