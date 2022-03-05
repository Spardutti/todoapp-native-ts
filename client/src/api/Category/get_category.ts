import axios from "axios";
import { useQuery } from "react-query";
import url from "../url";

/* GET ALL USER CATEGORIES */
const getUserCategories = (token: string) => {
  const response = axios.get(`${url}/categories`, {
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
  return axios.get(`${url}/category/${id}`);
};

const useGetCategoryById = (id: string | undefined) =>
  useQuery(["category", id], () => getCategoryById(id), {});

export { useGetUserCategories, useGetCategoryById };
