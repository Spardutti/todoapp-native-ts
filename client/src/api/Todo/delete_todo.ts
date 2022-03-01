import axios from "axios";
import { useQueryClient, useMutation } from "react-query";
import url from "../url";

const deleteTodo = (id: string) => {
  return axios.delete(`${url}/todo/${id}`);
};

const useDeleteTodo = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(() => deleteTodo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      queryClient.invalidateQueries("overdue");
      queryClient.invalidateQueries("upcoming");
    },
  });
};

export { useDeleteTodo };
