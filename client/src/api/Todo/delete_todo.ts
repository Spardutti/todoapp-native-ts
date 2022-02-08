import axios from "axios";
import { useQueryClient, useMutation } from "react-query";

const devUrl = "http://localhost:5000/api";

const deleteTodo = (id: string) => {
  return axios.delete(`${devUrl}/todo/${id}`);
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
