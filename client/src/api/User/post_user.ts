import axios from "axios";
import { useMutation } from "react-query";

const devUrl = "http://localhost:5000/api";

/* CREATE NEW USER */

const newUser = (data: {}) => {
  return axios.post(`${devUrl}/newuser`, { data }).catch((error) => {
    if (error.response) throw error.response;
  });
};

const useNewuser = () => {
  return useMutation<any, any, any, Error>(newUser);
};

export { useNewuser };
