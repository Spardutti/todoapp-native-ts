import { useGetTasks, useGetTask } from "./get_tasks";
import { useDeleteTask } from "./delete_task";
import { useUpdateTask } from "./put_task";
import { useAddTask } from "./post_task"

export const TaskApi = {
  useGetTasks,
  useGetTask,
  useDeleteTask,
  useUpdateTask,
  useAddTask,
};
