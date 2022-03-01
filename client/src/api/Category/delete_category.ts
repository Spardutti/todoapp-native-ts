import axios from "axios";
import { useMutation } from "react-query";
import url from "../url";

interface Info {
  id: string;
  token: string;
}

/* DELETE CATEGORY */
const deleteCategory = (info: Info) => {
  return axios
    .delete(`${url}/deletecategory/${info.id}`, {
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
