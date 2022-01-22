import axios from "axios";
import { useMutation } from "react-query";

const devUrl = "http://localhost:5000/api";

export const deleteTask = (id: string) => {
  return axios.delete(`${devUrl}/task/${id}`);
};

const useDeleteTask = () => {
  return useMutation(deleteTask);
};

export { useDeleteTask };
