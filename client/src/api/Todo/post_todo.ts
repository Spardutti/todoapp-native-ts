import axios from "axios";
import { useMutation } from "react-query";

const devUrl = "http://localhost:5000/api";

interface Token {
  token: string;
}

export interface Todo {
  todoName: string;
  todoDescription: string;
  dueDate: Date | null;
  token?: Token;
}

/* ADD A NEW TODO */
const addTodo = async (newTodo: Todo) => {
  try {
    const { todoName, todoDescription, dueDate, token } = newTodo;
    
    const response = axios.post(
      `${devUrl}/newTodo`,
      { todoName, todoDescription, dueDate },
      {
        headers: {
          Authorization: `Bearer ${token?.token}`,
        },
      }
    );
    console.log(token?.token, newTodo.token);
    
    return response;
  } catch (error) {
    return error;
  }
};

const useAddTodo = () => {
  return useMutation(addTodo);
};

export { useAddTodo };