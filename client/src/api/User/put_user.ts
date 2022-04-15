import axios from "axios";
import { useMutation } from "react-query";
import url from "../url";

/* SEND FRIEND REQUEST */
const sendFriendRequest = (data: { userId: string; friendId: string }) => {
  console.log(data.userId);

  return axios.put(`${url}/addFriendRequest/${data.userId}`, {
    friendId: data.friendId,
  });
};

export const useSendFriendRequest = () => {
  return useMutation(sendFriendRequest);
};
