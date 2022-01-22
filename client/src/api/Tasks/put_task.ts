import axios from "axios";
import { useMutation } from "react-query";

const devUrl = "http://localhost:5000/api";

const updateTask = (id: string) => {
  return axios.put(`${devUrl}/task/${id}`);
};

export const useUpdateTask = () => {
  return useMutation(updateTask);
};
