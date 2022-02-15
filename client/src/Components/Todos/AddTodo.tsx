import {
  Box,
  Button,
  CloseButton,
  FormControl,
  FormLabel,
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
import { DateTime } from "luxon";
import "../../Styles/calendar/calendarButton.scss";
import { ChooseCategoryButton } from "../Category/ChooseCategoryButton";
import ShowCategories from "../Category/ShowCategories";

interface Props {
  preSelectedDate: Date | null;
  onClose: () => void;
}

export const AddTodo: React.FC<Props> = ({ preSelectedDate, onClose }) => {
  const token = useAppSelector((state) => state.token);
  const [pickedDate, setPickedDate] = useState(new Date());
  const [pickedCategory, setPickedCategory] = useState("Pick a category");
  const [newTodo, setNewTodo] = useState<Todo>({
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
    console.log(pickedCategory);
  }, [pickedCategory]);

  const resetState = () => {
    setPickedDate(new Date());
    setPickedCategory("Pick a category");
    setNewTodo({
      todoName: "",
      todoDescription: "",
      dueDate: pickedDate,
      categoryId: pickedCategory,
    });
  };

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
  const { mutateAsync, isLoading } = useAddTodo();
  /* RUN MUTATION ON CLICK */
  const addTodo = async () => {
    console.log(newTodo);
    await mutateAsync(newTodo);
    /* UPDATE THE TODOS QUERY IN THE DOM */
    queryClient.invalidateQueries("todos");
    queryClient.invalidateQueries("upcoming");
    resetState();
  };

  const { todoName, todoDescription, dueDate } = newTodo;
  return (
    <Box
      maxW="550px"
      height="228px"
      width="full"
      mx="auto"
      mt={1}
      p={2}
      flexDir="column"
      padding="16px"
    >
      <FormControl mx={"auto"} height="141px">
        <Stack height="141px" alignItems={"center"} width="100%">
          <Box display="flex" flexDir="row" width="100%" maxH="21px">
            <Input
              placeholder="Todo name"
              variant="unstyled"
              value={todoName}
              name="todoName"
              onChange={(e) => newTodoHandler(e)}
              maxH="21px"
            />
            <CloseButton ml="auto" onClick={onClose} maxH="21px" />
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
            />
          </Box>
          <Divider orientation="horizontal" borderColor="blackAlpha.300" />
        </Stack>
      </FormControl>
      <Box height="64px" padding="24px 16px 8px 0px">
        {isLoading ? (
          <Button
            colorScheme="teal"
            isLoading
            loadingText="Submitting"
            maxH="30px"
            maxW="78px"
            fontSize="xs"
          />
        ) : (
          <Button
            colorScheme="messenger"
            onClick={addTodo}
            disabled={!todoName || !todoDescription || !dueDate}
            maxH="30px"
            maxW="78px"
            fontSize="xs"
          >
            Create Todo
          </Button>
        )}
      </Box>
    </Box>
  );
};
