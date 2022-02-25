import {
  Box,
  Button,
  Divider,
  Grid,
  HStack,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Todo } from "../../Interface/Interface";
import { OpenCalendarPopOverButton } from "../Calendar/OpenCalendarPopOver";
import { ChooseCategoryButton } from "../Category/ChooseCategoryButton";
import { useGetCategoryById } from "../../api/Category/get_category";
import {useEditTodo} from "../../api/Todo/put_todo"
import { useQueryClient } from "react-query";

interface EditTodoProps {
  isOpen: boolean;
  onClose: () => void;
  todo: Todo;
}

const EditTodo: React.FC<EditTodoProps> = ({
  isOpen,
  onClose,
  todo,
}) => {
  const [editedTodo, setEditedTodo] = useState({_id: todo._id, todoName: todo.todoName, todoDescription: todo.todoDescription, dueDate: new Date(todo.dueDate), categoryId: todo.category._id });
  const [pickedDate, setPickedDate] = useState(new Date(editedTodo.dueDate));
  const [pickedCategory, setPickedCategory] = useState(editedTodo.categoryId);

  const editTodoHandler = (e: any) => {
    const value = e.target.value;
    setEditedTodo({
      ...editedTodo,
      [e.target.name]: value,
    });
  };

  useEffect(() => {
    setEditedTodo({
      ...editedTodo,
      dueDate: pickedDate,
    });
    
  }, [pickedDate]);

  useEffect(() => {
    setEditedTodo({
      ...editedTodo,
      categoryId: pickedCategory,
    });        
  }, [pickedCategory]);

  const queryClient = useQueryClient()

  /* SEND EDITED TODO INFO TO THE DB */
  const {mutateAsync, isLoading} = useEditTodo();

  const editTodo = async() => {
    const response = await mutateAsync(editedTodo)   
            /* UPDATE THE TODOS QUERY IN THE DOM */
            queryClient.invalidateQueries("today");
            queryClient.invalidateQueries("upcoming");
            queryClient.invalidateQueries("overdue");
            queryClient.invalidateQueries("completed");
            queryClient.invalidateQueries("latest");
        
            toast.success("Todo edited succesfully");
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Grid p={5} templateColumns={"20px 10fr"}>
          <Box p={5}>
            <Input
              fontSize={22}
              fontWeight={"bold"}
              width="200px"
              value={editedTodo.todoName}
              name="todoName"
              onChange={(e) => editTodoHandler(e)}
            />
            <Textarea
              value={editedTodo.todoDescription}
              name="todoDescription"
              onChange={(e) => editTodoHandler(e)}
            />
            <Box>
              <OpenCalendarPopOverButton
                pickedDate={pickedDate}
                setPickedDate={setPickedDate}
              />
              <ChooseCategoryButton
                pickedCategory={pickedCategory}
                setPickedCategory={setPickedCategory}
                preSelectedCategory={{categoryName: todo.category.categoryName, color: todo.category.color}}
              />
            </Box>
          </Box>
          <Box onClick={editTodo}>
            <Button>Save</Button>
          </Box>
        </Grid>
        <ModalCloseButton />
        <Divider mb={5} w="90%" mx="auto" />
      </ModalContent>
    </Modal>
  );
};

export default EditTodo;
