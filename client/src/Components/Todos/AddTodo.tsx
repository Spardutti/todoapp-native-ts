import {
  Box,
  Button,
  CloseButton,
  FormControl,
  Input,
  Stack,
  Textarea,
  Divider,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import { Todo } from "../../api/Todo/post_todo";
import { useAppSelector } from "../../hooks";
import { useAddTodo } from "../../api/Todo/post_todo";
import React from "react";
import { OpenCalendarPopOverButton } from "../Calendar/OpenCalendarPopOver";
import "../../Styles/calendar/calendarButton.scss";
import { ChooseCategoryButton } from "../Category/ChooseCategoryButton";
import toast from "react-hot-toast";

interface Props {
  preSelectedDate: Date | null;
  onClose: () => void;
}

export const AddTodo: React.FC<Props> = ({ preSelectedDate, onClose }) => {
  const token = useAppSelector((state) => state.token);
  const [pickedDate, setPickedDate] = useState(new Date());
  const [pickedCategory, setPickedCategory] = useState("");
  const preSelectedCategory = null;
  const [newTodo, setNewTodo] = useState<Todo>({
    _id: "",
    todoName: "",
    todoDescription: "",
    dueDate: pickedDate,
    categoryId: pickedCategory,
    token: token,
  });

  useEffect(() => {
    if (preSelectedDate) setPickedDate(preSelectedDate);
  }, []);

  useEffect(() => {
    setNewTodo({ ...newTodo, dueDate: pickedDate });
  }, [pickedDate]);

  useEffect(() => {
    setNewTodo({ ...newTodo, categoryId: pickedCategory });
  }, [pickedCategory]);

  const resetState = () => {
    setPickedDate(new Date());
    setPickedCategory("");
    setNewTodo({
      _id: "",
      todoName: "",
      todoDescription: "",
      dueDate: pickedDate,
      categoryId: pickedCategory,
    });
  };

  /* HANDLERS */
  const newTodoHandler = (e: any) => {
    const value = e.target.value;
    setNewTodo({
      ...newTodo,
      [e.target.name]: value,
    });
  };

  const queryClient = useQueryClient();

  /* ADD A NEW TODO TO THE DB OR SHOW ERRORS*/
  const { mutateAsync, isLoading } = useAddTodo();

  /* RUN MUTATION ON CLICK */
  const addTodo = async () => {
    const response = await mutateAsync(newTodo).catch((err) =>
      err.data.errors.map((err: any) => toast.error(err.msg))
    );

    if (response.status === 200) {
      /* UPDATE THE TODOS QUERY IN THE DOM */
      queryClient.invalidateQueries("today");
      queryClient.invalidateQueries("upcoming");
      queryClient.invalidateQueries("latest");
      toast.success("Todo created succesfully");
      onClose();
      resetState();
    }
  };

  const { todoName, todoDescription, dueDate, categoryId } = newTodo;
  return (
    <Box
      height="228px"
      width="full"
      mx="auto"
      mt={1}
      p={2}
      flexDir="column"
      padding="16px"
    >
      <FormControl height="141px">
        <Stack height="141px" alignItems={"center"}>
          <Box display="flex" flexDir="row" width="100%" maxH="21px">
            <Input
              placeholder="Todo name"
              variant="unstyled"
              value={todoName}
              name="todoName"
              onChange={(e) => newTodoHandler(e)}
              maxH="21px"
            />
            <CloseButton onClick={onClose} maxH="21px" />
          </Box>
          <Box width="100%" maxH="78px" mt="8px">
            <Textarea
              resize="none"
              placeholder="Description"
              variant="unstyled"
              value={todoDescription}
              name="todoDescription"
              onChange={(e) => newTodoHandler(e)}
              padding="1px"
              margin="0px"
            />
          </Box>
          <Box width="100%" maxH="38px" display="flex" flexDir="row">
            <OpenCalendarPopOverButton
              pickedDate={pickedDate}
              setPickedDate={setPickedDate}
            />
            <ChooseCategoryButton
              pickedCategory={pickedCategory}
              setPickedCategory={setPickedCategory}
              preSelectedCategory={preSelectedCategory}
            />
          </Box>
          <Divider borderColor="blackAlpha.300" />
        </Stack>
      </FormControl>
      <Box height="64px" padding="24px 16px 8px 0px">
        {isLoading ? (
          <Button
            colorScheme="teal"
            isLoading
            loadingText="Submitting"
            size={"sm"}
            fontSize="xs"
          />
        ) : (
          <Button
            colorScheme="messenger"
            onClick={addTodo}
            disabled={!todoName || !todoDescription || !dueDate || !categoryId}
            size={"sm"}
            fontSize="xs"
          >
            Create Tasks
          </Button>
        )}
      </Box>
    </Box>
  );
};
