import axios from "axios";
import { useMutation } from "react-query";

const devUrl = "http://localhost:5000/api";

export const deleteTodo = (id: string) => {
  return axios.delete(`${devUrl}/todo/${id}`);
};

const useDeleteTodo = () => {
  return useMutation(deleteTodo);
};

export { useDeleteTodo };
