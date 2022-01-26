import { TodoApi } from "../../api/Todo/TodoApi";
import {
  Center,
  Spinner,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Button,
} from "@chakra-ui/react";
import { Todo } from "./Todo";
import { AddTodo } from "./AddTodo";
import { NewCategory } from "./NewCategory";
import { useContext } from "react";
import { userContext } from "../../Context/UserContext";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

/* GET ALL USER TODOS */
export const Todos = () => {
  const { isLoading, data, error } = TodoApi.useGetTodos();
  const { user } = useContext(userContext);

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  if (isLoading)
    return (
      <Center>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );

  if (error) return <div>error {error.message} </div>;

  /* TEST */
  const logout = () => {
    queryClient.invalidateQueries("user");
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <AddTodo />
      <NewCategory />
      <Button onClick={logout}>Logout </Button>
      {user ? <div>hello {user.username} </div> : null}
      <Table variant={"striped"} colorScheme={"teal"}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.data.map((todo: any, index: number) => {
            const { todoName, todoDescription, dueDate, _id, isCompleted } =
              todo;
            const date = new Date(dueDate).toDateString();
            return (
              <Todo
                key={index}
                todoName={todoName}
                description={todoDescription}
                date={date}
                _id={_id}
                index={index}
                isCompleted={isCompleted}
              />
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};
