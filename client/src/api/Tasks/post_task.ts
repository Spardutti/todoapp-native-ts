import axios from "axios"
import { useMutation } from "react-query"

const devUrl = "http://localhost:5000/api"

/* ADD A NEW TASK */
const addTask = async (newTask: { taskName: string, taskDescription: string}) => {
    try {
        const taskName = newTask.taskName
        const taskDescription = newTask.taskDescription
        const response = axios.post(`${devUrl}/newTask`, {taskName, taskDescription})
        return response;
    } catch (error) {
        return error;
    }
}

const useAddTask = () => {
    return useMutation(addTask)
}

export { useAddTask };


