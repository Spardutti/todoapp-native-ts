import axios from "axios";
import { useMutation } from "react-query";

const devUrl = "http://localhost:5000/api";

interface Category {
  categoryName: string;
  color: string;
  token: string;
}

/* ADD A NEW CATEGORY */
const newCategory = async (category: Category) => {
  const { categoryName, token, color } = category;

  return axios
    .post(
      `${devUrl}/newCategory`,
      { categoryName, color },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) return error.response;
    });
};

const useNewCategory = () => {
  return useMutation(newCategory);
};

export { useNewCategory };
