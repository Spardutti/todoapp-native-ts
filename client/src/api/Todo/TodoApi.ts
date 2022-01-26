import { useGetTodos, useGetTodo } from "./get_todo";
import { useDeleteTodo } from "./delete_todo";
import { useUpdateTodo } from "./put_todo";
import { useAddTodo } from "./post_todo";

export const TodoApi = {
  useAddTodo,
  useGetTodo,
  useGetTodos,
  useDeleteTodo,
  useUpdateTodo,
};
