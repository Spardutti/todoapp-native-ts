import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const devUrl = "http://localhost:5000/api";

/* CREATE NEW USER */

const newUser = (data: {}) => {
  return axios.post(`${devUrl}/newuser`, { data }).catch((error) => {
    if (error.response) throw error.response;
  });
};

export const useNewuser = () => {
  return useMutation<any, any, any, any>(newUser);
};

/* LOGIN LOCAL USER */
const localLogin = (user: { email: string; password: string }) => {
  return axios
    .post(`${devUrl}/localuser`, { email: user.email, password: user.password })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      if (error.response) throw error.response;
    });

  /*   const response = await fetch(`${devUrl}/localuser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  });

  const data = await response.json();
  console.log(data);
  return data; */
  /*   return axios({
    method: "post",
    url: `${devUrl}/localuser`,
    headers: { "Content-Type": "application/json" },
    data: {
      email: user.email,
      password: user.password,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) throw error.response;
    }); */
};

export const useLocalUser = () => {
  const navigate = useNavigate();

  return useMutation<any, any, any>(localLogin, {
    onSuccess: () => {
      navigate("/home");
    },
  });
};
