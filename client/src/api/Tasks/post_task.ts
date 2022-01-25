import axios from "axios";
import { useMutation } from "react-query";

const devUrl = "http://localhost:5000/api";

/* ADD A NEW TASK */
const addTask = async (taskName: string) => {
  try {
    const response = axios.post(`${devUrl}/newTask`, { taskName });
    return response;
  } catch (error) {
    return error;
  }
};

const useAddTask = () => {
  return useMutation(addTask);
};

export { useAddTask };
