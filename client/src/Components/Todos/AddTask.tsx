import {
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { TaskApi } from "../../api/Tasks/TasksApi";
import { useQueryClient } from "react-query";
import { tokenContext } from "../../Context/tokenContex";

export const AddTask: React.FC = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const { token } = useContext(tokenContext);
  const [newTask, setNewTask] = useState({
    taskName: "",
    taskDescription: "",
    token,
  });

  const toggleTaskForm = () => setShowTaskForm(!showTaskForm);

  const queryClient = useQueryClient();

  /* HANDLERS */
  const newTaskHandler = (e: any) => {
    const value = e.target.value;
    setNewTask({
      ...newTask,
      [e.target.name]: value,
    });
  };

  /* ADD A NEW TASK TO THE DB */
  const { mutateAsync, isLoading } = TaskApi.useAddTask();

  const addTask = async () => {
    /* await mutateAsync(task) */
    await mutateAsync(newTask);
    /* UPDATE THE TASKS QUERY IN THE DOM */
    queryClient.invalidateQueries("tasks");
    setNewTask({
      taskName: "",
      taskDescription: "",
      token,
    });
    toggleTaskForm();
  };

  if (showTaskForm) {
    return (
      <div>
        <FormControl>
          <FormLabel>Task Name</FormLabel>
          <Input
            value={newTask.taskName}
            name="taskName"
            onChange={(e) => newTaskHandler(e)}
          />
          <FormHelperText>
            Please insert a name for the new task.
          </FormHelperText>
          <FormLabel>Task Description</FormLabel>
          <Input
            value={newTask.taskDescription}
            name="taskDescription"
            onChange={(e) => newTaskHandler(e)}
          />
          <FormHelperText>Describe the new task.</FormHelperText>
          {isLoading ? (
            <Button
              colorScheme="teal"
              size="sm"
              isLoading
              loadingText="Submitting"
            />
          ) : (
            <Button colorScheme="messenger" size="sm" onClick={addTask}>
              Create Task
            </Button>
          )}
        </FormControl>
      </div>
    );
  }

  return (
    <div>
      <Button colorScheme="teal" size="md" onClick={toggleTaskForm}>
        New Task
      </Button>
    </div>
  );
};
