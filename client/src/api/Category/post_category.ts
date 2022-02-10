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
  try {
    const { categoryName, token, color } = category;

    const response = axios.post(
      `${devUrl}/newCategory`,
      { categoryName, color },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

const useNewCategory = () => {
  return useMutation<any, any, any, any>(newCategory);
};

export { useNewCategory };
