import {
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { TaskApi } from "../../api/Tasks/TasksApi";
import { useQueryClient } from "react-query";

export const AddTask: React.FC = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskName, setTaskName] = useState("");
  /* const [task, setTask] = useState({taskName:"", }); */

  const toggleTaskForm = () => setShowTaskForm(!showTaskForm);

  const queryClient = useQueryClient();

  /* HANDLERS */
  const taskNameHandler = (e: any) => {
    setTaskName(e.target.value);
  };

  /* ADD A NEW TASK TO THE DB */
  const { mutateAsync, isLoading } = TaskApi.useAddTask();

  const addTask = async () => {
    /* await mutateAsync(task) */
    await mutateAsync(taskName);
    /* UPDATE THE TASKS QUERY IN THE DOM */
    queryClient.invalidateQueries("tasks");
    setTaskName("");
    toggleTaskForm();
  };

  if (showTaskForm) {
    return (
      <div>
        <FormControl>
          <FormLabel>Task Name</FormLabel>
          <Input value={taskName} onChange={(e) => taskNameHandler(e)} />
          <FormHelperText>
            Please insert a name for the new task.
          </FormHelperText>
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
