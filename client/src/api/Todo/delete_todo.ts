import axios from "axios";
import { useQueryClient, useMutation } from "react-query";
import url from "../url";

const deleteTodo = (id: string) => {
  return axios.delete(`${url}/todo/${id}`);
};

const useDeleteTodo = (id: string) => {
  return useMutation(() => deleteTodo(id), {});
};

export { useDeleteTodo };
