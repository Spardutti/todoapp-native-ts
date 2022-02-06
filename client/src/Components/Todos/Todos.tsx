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
import { NewCategory } from "../Category/NewCategory";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { useGetUserTodos } from "../../api/Todo/get_todo";

/* GET ALL USER TODOS */
export const Todos = () => {
  const [userId, setUserId] = useState("");
  const [enableRefetch, setEnableRefetch] = useState(false);
  const token = useAppSelector((state) => state.token);
  const { isLoading, data, error, refetch } = useGetUserTodos(token.token);
  const user = useAppSelector((state) => state.user);

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // setUserId(user._id);
    }
    if (userId) {
      setEnableRefetch(true);
      refetch();
    }
  }, [user, userId]);

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
      <AddTodo preSelectedDate={new Date("2022-02-06T16:35:02.081Z")} />
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
          {data &&
            data.data.map((todo: any, index: number) => {
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
