import axios from "axios";
import { useQuery } from "react-query";

const devUrl = "http://localhost:5000/api";

/* GET ALL TODOS */
const getTodos = async () => {
  try {
    const response = axios.get(`${devUrl}/todos`);
    return response;
  } catch (error) {
    return error;
  }
};

const useGetTodos = () => {
  return useQuery<any, Error>("todos", getTodos);
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

export { useGetTodos, useGetTodo };
