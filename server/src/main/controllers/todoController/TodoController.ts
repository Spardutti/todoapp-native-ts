import { addTodo } from "./post_todo";
import {
  getAllTodos,
  getTodo,
  getTodoByStatus,
  getTodosByDate,
  getTodaysTodos,
} from "./get_todo";
import { deleteTodo } from "./delete_todo";
import { putTodo } from "./put_todo";

export const TodoController = {
  addTodo,
  getAllTodos,
  getTodo,
  getTodoByStatus,
  deleteTodo,
  putTodo,
  getTodosByDate,
  getTodaysTodos,
};
