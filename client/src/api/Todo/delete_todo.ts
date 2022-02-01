import axios from "axios";
import { useMutation } from "react-query";

const devUrl = "http://localhost:5000/api";

const deleteTodo = (id: string) => {
  return axios.delete(`${devUrl}/todo/${id}`);
};

const useDeleteTodo = (id: string) => {
  return useMutation(() => deleteTodo(id));
};

export { useDeleteTodo };
