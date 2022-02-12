import { addTodo } from "./post_todo";
import {
  getAllTodos,
  getTodo,
  getTodosByCategory,
  getTodosByDate,
  getTodaysTodos,
  getOverdueTodos,
  getUpcomingTodos,
} from "./get_todo";
import { deleteTodo } from "./delete_todo";
import { putTodo } from "./put_todo";

export const TodoController = {
  addTodo,
  getAllTodos,
  getTodo,
  getTodosByCategory,
  deleteTodo,
  putTodo,
  getTodosByDate,
  getTodaysTodos,
  getUpcomingTodos,
  getOverdueTodos,
};
