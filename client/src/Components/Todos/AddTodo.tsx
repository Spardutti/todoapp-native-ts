import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { TodoApi } from "../../api/Todo/TodoApi";
import { useQueryClient } from "react-query";
import { tokenContext } from "../../Context/tokenContex";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const AddTodo: React.FC = () => {
  const [showTodoForm, setShowTodoForm] = useState(false);
  const { token } = useContext(tokenContext);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [newTodo, setNewTodo] = useState({
    todoName: "",
    todoDescription: "",
    dueDate: startDate,
    token,
  });

  const toggleTodoForm = () => setShowTodoForm(!showTodoForm);

  const queryClient = useQueryClient();

  /* HANDLERS */
  const newTodoHandler = (e: any) => {
    const value = e.target.value;
    setNewTodo({
      ...newTodo,
      [e.target.name]: value,
    });
  };

  /* ADD A NEW TODO TO THE DB */
  const { mutateAsync, isLoading } = TodoApi.useAddTodo();

  const addTodo = async () => {
    await mutateAsync(newTodo);
    /* UPDATE THE TODOS QUERY IN THE DOM */
    queryClient.invalidateQueries("todos");
    setNewTodo({
      todoName: "",
      todoDescription: "",
      dueDate: new Date(Date.now()),
      token,
    });
    toggleTodoForm();
  };

  if (showTodoForm) {
    const { todoName, todoDescription } = newTodo;
    return (
      <div>
        <FormControl p={2} w={400} mx={"auto"}>
          <Stack alignItems={"center"}>
            <FormLabel>Todo Name</FormLabel>
            <Input
              value={todoName}
              name="todoName"
              onChange={(e) => newTodoHandler(e)}
            />
            <FormLabel>Todo Description</FormLabel>
            <Input
              value={todoDescription}
              name="todoDescription"
              onChange={(e) => newTodoHandler(e)}
            />
            <FormLabel>Select Date</FormLabel>
            <Box textAlign={"center"} bg="black" p={1} borderRadius={5}>
              <DatePicker
                minDate={new Date()}
                onChange={(date) => setStartDate(date)}
                placeholderText="Please select a date"
              />
            </Box>

            {isLoading ? (
              <Button
                mt={2}
                w={40}
                colorScheme="teal"
                isLoading
                loadingText="Submitting"
              />
            ) : (
              <Button
                mt={2}
                colorScheme="messenger"
                w={40}
                onClick={addTodo}
                disabled={!todoName || !todoDescription}
              >
                Create Todo
              </Button>
            )}
          </Stack>
        </FormControl>
      </div>
    );
  }

  return (
    <div>
      <Button colorScheme="teal" size="md" onClick={toggleTodoForm}>
        New Todo
      </Button>
    </div>
  );
};
