import axios from "axios";
import { useMutation } from "react-query";

const devUrl = "http://localhost:5000/api";

const updateTask = (data: { id: string; status: boolean }) => {
  return axios.put(`${devUrl}/task/${data.id}`, { isCompleted: data.status });
};

export const useUpdateTask = () => {
  return useMutation(updateTask);
};
