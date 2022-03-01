import axios from "axios";
import { useQuery } from "react-query";
import url from "../url";

/* GET USER */
const getUser = async (userId: string) => {
  try {
    const response = axios.get(`${url}/user/${userId}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const useGetuser = (userId: string) => {
  return useQuery<any, Error>("user", () => getUser(userId), {
    enabled: false,
  });
};
