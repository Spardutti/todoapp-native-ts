import { Box } from "@chakra-ui/react";
import React from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useDeleteCategory } from "../../api/Category/delete_category";
import { useAppSelector } from "../../hooks";
interface DeleteCategoryProps {
  id: string;
}

const DeleteCategory: React.FC<DeleteCategoryProps> = ({ id }) => {
  const token = useAppSelector((state) => state.token.token);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  /* DELETE CATEGORY */
  const { mutateAsync } = useDeleteCategory();

  const deleteCat = async () => {
    const info = {
      id,
      token,
    };
    const resposne = await mutateAsync(info);
    if (resposne.status === 500) {
      navigate(`/category/${id}`);
      toast.error(
        "You can't delete a category \n that still have existing tasks ",
        {
          duration: 5000,
        }
      );
    }
    if (resposne.status === 200) {
      toast.success("Category deleted succesfully");
      navigate("/home");
    }
    queryClient.invalidateQueries("todosCategory");
  };

  return (
    <Box ml="auto" _hover={{ color: "red" }} cursor="pointer">
      <AiOutlineDelete onClick={deleteCat} />
    </Box>
  );
};

export default DeleteCategory;
