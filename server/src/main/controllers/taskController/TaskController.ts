import { addTask } from "./post_controller";
import { getAllTask, getTask, getTaskByStatus } from "./get_controllers";

export const TaskController = {
  addTask,
  getAllTask,
  getTask,
  getTaskByStatus,
};
