import { Spinner, Td, Tr } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { BsCheckCircle } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { TaskApi } from "../../api/Tasks/TasksApi";
import { useQueryClient, useMutation } from "react-query";
import { ImCross } from "react-icons/im";

type Props = {
  taskName: string;
  description: string;
  date: string;
  index: number;
  _id: string;
  isCompleted: boolean;
};

export const Todo: React.FC<Props> = ({
  taskName,
  description,
  date,
  _id,
  isCompleted,
}) => {
  const queryClient = useQueryClient();

  /* DELETE TASK */
  const { mutateAsync, isLoading } = TaskApi.useDeleteTask();

  const deleteTask = async (id: string) => {
    await mutateAsync(id);
    queryClient.invalidateQueries("tasks");
  };

  /* UDPATE TAS KSTATUS */
  const { mutateAsync: updateAsync, isLoading: isLoadingUpdate } =
    TaskApi.useUpdateTask();

  const udpateTask = async (data: { id: string; status: boolean }) => {
    await updateAsync(data);
    queryClient.invalidateQueries("tasks");
  };

  return (
    <Tr>
      <Td>{taskName}</Td>
      <Td>{description}</Td>
      <Td>{date}</Td>
      <Td w={10}>
        <motion.div
          id={_id}
          animate={{ cursor: "pointer" }}
          whileHover={{ scale: 1.2, originX: 0, originY: 0 }}
          onClick={() => deleteTask(_id)}
        >
          {isLoading ? <Spinner /> : <MdDelete />}
        </motion.div>
      </Td>
      <Td w={10}>
        <motion.div
          animate={{ cursor: "pointer" }}
          whileHover={{ scale: 1.2, originX: 0, originY: 0 }}
          onClick={() => udpateTask({ id: _id, status: isCompleted })}
        >
          {isCompleted} {isCompleted ? <BsCheckCircle /> : <ImCross />}
        </motion.div>
      </Td>
    </Tr>
  );
};
