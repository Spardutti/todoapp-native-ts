import axios from "axios";
import { useMutation } from "react-query";

const devUrl = "http://localhost:5000/api";

interface Info {
  id: string;
  token: string;
}

/* DELETE CATEGORY */
const deleteCategory = (info: Info) => {
  return axios
    .delete(`${devUrl}/deletecategory/${info.id}`, {
      headers: {
        Authorization: `Bearer ${info.token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      if (err.response) return err.response;
    });
};

const useDeleteCategory = () => {
  return useMutation(deleteCategory);
};

export { useDeleteCategory };
