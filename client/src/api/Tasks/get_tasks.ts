import axios from "axios";

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

/* GET TASK BY ID */
const getTask = async (id: string) => {
  try {
    const response = axios.get(`${devUrl}/task/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export { getTasks, getTask };
