import { useQuery } from "react-query";
import { TaskApi } from "../../api/Tasks/TasksApi";
import {
  Box,
  Center,
  Spinner,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Tfoot,
  Td,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { BsCheckCircle } from "react-icons/bs";
import { motion } from "framer-motion";

export const Todos = () => {
  const { isLoading, data, error } = useQuery<any, Error>(
    "tasks",
    TaskApi.getTasks
  );

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

  const MotionTd = motion(Td);

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
          const { taskName, description, dueDate } = task;
          const date = new Date(dueDate).toDateString();
          return (
            <Tr key={index}>
              <Td>{taskName}</Td>
              <Td>{description}</Td>
              <Td>{date}</Td>
              <MotionTd>
                <motion.div whileHover={{ scale: 1.2 }}>
                  <MdDelete />
                </motion.div>
              </MotionTd>
              <Td>
                <BsCheckCircle />
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );

  /*   const { isLoading, data, error } = useQuery<any, Error>("task", () =>
    TaskApi.getTask("61dae0009f3b5ed7af40c4b8")
  );

  if (isLoading) return <div>loading</div>;

  if (error) return <div> error {error.message}</div>;

  return (
    <div>
      <p> here {data.data.taskName}</p>
    </div>
  ); */
};
