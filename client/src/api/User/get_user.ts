import axios from "axios";
import { useQuery } from "react-query";

const devUrl = "http://localhost:5000/api";

/* GET USER */
const getUser = async (userId: string) => {
  try {
    const response = axios.get(`${devUrl}/user/${userId}`);
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
