import { addTodo } from "./post_todo";
import {
  getAllTodos,
  getTodo,
  getTodosByCategory,
  getTodosByDate,
  getTodaysTodos,
  getOverdueTodos,
  getUpcomingTodos,
  getCompletedTodos,
  getLatestTodos,
} from "./get_todo";
import { deleteTodo } from "./delete_todo";
import { toggleIsCompleted } from "./put_todo";

export const TodoController = {
  addTodo,
  getAllTodos,
  getTodo,
  getTodosByCategory,
  deleteTodo,
  toggleIsCompleted,
  getTodosByDate,
  getTodaysTodos,
  getUpcomingTodos,
  getOverdueTodos,
  getCompletedTodos,
  getLatestTodos,
};
