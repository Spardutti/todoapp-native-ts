import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import url from "../url";

/* CREATE NEW USER */

const newUser = (data: {}) => {
  return axios.post(`${url}/newuser`, { data }).catch((error) => {
    if (error.response) throw error.response;
  });
};

export const useNewuser = () => {
  return useMutation<any, any, any, any>(newUser, {
    onSuccess: () => {
      toast.success("Created");
    },
  });
};

/* LOGIN LOCAL USER */
const localLogin = (user: { email: string; password: string }) => {
  return axios
    .post(`${url}/localuser`, { email: user.email, password: user.password })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) throw error.response;
    });
};

export const useLocalUser = () => {
  const navigate = useNavigate();

  return useMutation<any, any, any>(localLogin, {
    onSuccess: () => {
      navigate("/home");
    },
  });
};
