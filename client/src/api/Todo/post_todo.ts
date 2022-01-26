import axios from "axios";
import { useMutation } from "react-query";

const devUrl = "http://localhost:5000/api";

/* ADD A NEW TODO */
const addTodo = async (newTodo: {
  todoName: string;
  todoDescription: string;
  token: string;
}) => {
  try {
    const { todoName, todoDescription, token } = newTodo;

    const response = axios.post(
      `${devUrl}/newTodo`,
      { todoName, todoDescription },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

const useAddTodo = () => {
  return useMutation(addTodo);
};

export { useAddTodo };
