import { addTask } from "./post_task";
import { getAllTask, getTask, getTaskByStatus } from "./get_task";
import { deleteTask } from "./delete_task";
import { putTask } from "./put_task";

export const TaskController = {
  addTask,
  getAllTask,
  getTask,
  getTaskByStatus,
  deleteTask,
  putTask,
};
