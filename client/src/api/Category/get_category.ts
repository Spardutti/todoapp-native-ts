import axios from "axios";
import { useQuery } from "react-query";

const devUrl = "http://localhost:5000/api";

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

/* GET CATEGORY BY ID */
const getCategoryById = (id: string | undefined) => {
  return axios.get(`${devUrl}/category/${id}`);
};

const useGetCategoryById = (id: string | undefined) =>
  useQuery(["category", id], () => getCategoryById(id), {});

export { useGetUserCategories, useGetCategoryById };
