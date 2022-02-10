import axios from "axios";
import { useQuery } from "react-query";

const devUrl = "http://localhost:5000/api";

/* GET ALL THE CATEGORIES THAT THE USER CREATED 
(DONT GET ALL THE CATEGORIES IN THE DB) */

/* const getTodos = async () => {
    try {
        const response = axios.get()
    } catch (error) {
        return error;
    }
} */

/* GET ALL USER CATEGORIES */
const getUserCategories = (token: string) => {
  const response = axios.get(`${devUrl}/categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const useGetUserCategories = (token: string) =>
  useQuery(["categories", token], () => getUserCategories(token));

export { useGetUserCategories };
