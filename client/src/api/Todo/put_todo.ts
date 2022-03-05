import axios from "axios";
import { useMutation } from "react-query";
import { Todo } from "./post_todo";
import url from "../url";

const toggleIsCompleted = (data: { id: string; status: boolean }) => {
  return axios.put(`${url}/todo/${data.id}`, { isCompleted: data.status });
};

export const useToggleIsCompelted = () => {
  return useMutation(toggleIsCompleted);
};

const editTodo = (editedTodo: Todo) => {
  const { todoName, todoDescription, dueDate, categoryId } = editedTodo;

  return axios.put(`${url}/editTodo/${editedTodo._id}`, {
    todoName,
    todoDescription,
    dueDate,
    categoryId,
  });
};

export const useEditTodo = () => {
  return useMutation(editTodo);
};
