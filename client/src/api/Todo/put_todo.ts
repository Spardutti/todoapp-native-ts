import axios from "axios";
import { useMutation } from "react-query";

const devUrl = "http://localhost:5000/api";

const toggleIsCompleted = (data: { id: string; status: boolean }) => {
  return axios.put(`${devUrl}/todo/${data.id}`, { isCompleted: data.status });
};

export const useToggleIsCompelted = () => {
  return useMutation(toggleIsCompleted);
};
