import axios from "axios";
import { useMutation } from "react-query";

const devUrl = "http://localhost:5000/api";

/* ADD A NEW TASK */
const addTask = async (newTask: { taskName: string, taskDescription: string, token: string}) => {
    try {
        const { taskName, taskDescription, token} = newTask
        
        const response = axios.post(`${devUrl}/newTask`, {taskName, taskDescription}, {headers:{
          Authorization: `Bearer ${token}`
        } })
        return response;
    } catch (error) {
        return error;
    }
}

const useAddTask = () => {
  return useMutation(addTask);
};

export { useAddTask };
