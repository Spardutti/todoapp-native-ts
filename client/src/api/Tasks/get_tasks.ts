import axios from "axios";
import { useQuery } from "react-query";

const devUrl = "http://localhost:5000/api";

/* GET ALL TASKS */
const getTasks = async () => {
  try {
    const response = axios.get(`${devUrl}/tasks`);
    return response;
  } catch (error) {
    return error;
  }
};

const useGetTasks = () => {
  return useQuery<any, Error>("tasks", getTasks);
};

/* GET TASK BY ID */
const getTask = async (id: string) => {
  try {
    const response = axios.get(`${devUrl}/task/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

const useGetTask = (id: string) => {
  return useQuery<any, Error>(["task", id], () => getTask(id));
};

export { useGetTasks, useGetTask };
