import { Spinner, Td, Tr } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { BsCheckCircle } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { useQueryClient } from "react-query";
import { ImCross } from "react-icons/im";
import { useDeleteTodo } from "../../api/Todo/delete_todo";
import { useUpdateTodo } from "../../api/Todo/put_todo";

type Props = {
  todoName: string;
  description: string;
  date: string;
  index: number;
  _id: string;
  isCompleted: boolean;
};

export const Todo: React.FC<Props> = ({
  todoName,
  description,
  date,
  _id,
  isCompleted,
}) => {
  const queryClient = useQueryClient();

  /* DELETE TODO */
  const { mutateAsync, isLoading } = useDeleteTodo();

  const deleteTodo = async (id: string) => {
    await mutateAsync(id);
    queryClient.invalidateQueries("todos");
  };

  /* UDPATE TODO STATUS */
  const { mutateAsync: updateAsync, isLoading: isLoadingUpdate } =
    useUpdateTodo();

  const updateTodo = async (data: { id: string; status: boolean }) => {
    await updateAsync(data);
    queryClient.invalidateQueries("todos");
  };

  return (
    <Tr>
      <Td>{todoName}</Td>
      <Td>{description}</Td>
      <Td>{date}</Td>
      <Td w={10}>
        <motion.div
          id={_id}
          animate={{ cursor: "pointer" }}
          whileHover={{ scale: 1.2, originX: 0, originY: 0 }}
          onClick={() => deleteTodo(_id)}
        >
          {isLoading ? <Spinner /> : <MdDelete />}
        </motion.div>
      </Td>
      <Td w={10}>
        <motion.div
          animate={{ cursor: "pointer" }}
          whileHover={{ scale: 1.2, originX: 0, originY: 0 }}
          onClick={() => updateTodo({ id: _id, status: isCompleted })}
        >
          {isCompleted} {isCompleted ? <BsCheckCircle /> : <ImCross />}
        </motion.div>
      </Td>
    </Tr>
  );
};
