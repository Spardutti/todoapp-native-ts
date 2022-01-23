import { TaskApi } from "../../api/Tasks/TasksApi";
import { Center, Spinner, Table, Thead, Tr, Th, Tbody } from "@chakra-ui/react";
import { Todo } from "./Todo";

export const Todos = () => {
  const { isLoading, data, error } = TaskApi.useGetTasks();

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

  return (
    <Table variant={"striped"} colorScheme={"teal"}>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Description</Th>
          <Th>Date</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.data.map((task: any, index: number) => {
          const { taskName, taskDescription, dueDate, _id, isCompleted } = task;
          const date = new Date(dueDate).toDateString();
          return (
            <Todo
              key={index}
              taskName={taskName}
              description={taskDescription}
              date={date}
              _id={_id}
              index={index}
              isCompleted={isCompleted}
            />
          );
        })}
      </Tbody>
    </Table>
  );
};
