import axios from "axios";
import { useMutation } from "react-query";

const devUrl = "http://localhost:5000/api";

interface Token {
  token: string;
}

export interface Todo {
  _id: string;
  todoName: string;
  todoDescription: string;
  dueDate: Date | null;
  categoryId: string;
  token?: Token;
}

/* ADD A NEW TODO */
const addTodo = async (newTodo: Todo) => {
  const { todoName, todoDescription, dueDate, token, categoryId } = newTodo;

  return axios
    .post(
      `${devUrl}/newTodo`,
      { todoName, todoDescription, dueDate, categoryId },
      {
        headers: {
          Authorization: `Bearer ${token?.token}`,
        },
      }
    )

    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) throw error.response;
    });
};

const useAddTodo = () => {
  return useMutation(addTodo);
};

export { useAddTodo };
