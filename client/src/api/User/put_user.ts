import axios from "axios";
import { useMutation } from "react-query";
import url from "../url";

/* SEND FRIEND REQUEST */
const sendFriendRequest = (data: {
  userId: string;
  friendId: string;
  friendName: string;
  ownName: string;
}) => {
  return axios.put(`${url}/addFriendRequest/${data.userId}`, {
    friendId: data.friendId,
    friendName: data.friendName,
    ownName: data.ownName,
  });
};

export const useSendFriendRequest = () => {
  return useMutation(sendFriendRequest);
};

/* DELETE A FRIEND´S REQUEST */
const delFriendRequest = (data: { userId: string; friendId: string }) => {
  return axios.put(`${url}/delFriendRequest/${data.userId}`, {
    friendId: data.friendId,
  });
};

export const useDelFriendRequest = () => {
  return useMutation(delFriendRequest);
};

/* ADD FRIEND */
const addFriend = (data: {
  userId: string;
  friendId: string;
  friendName: string;
  ownName: string;
}) => {
  return axios.put(`${url}/addFriend/${data.userId}`, {
    friendId: data.friendId,
    friendName: data.friendName,
    ownName: data.ownName,
  });
};

export const useAddFriend = () => {
  return useMutation(addFriend);
};

/* DELETE A FRIEND */
const delFriend = (data: { userId: string; friendId: string }) => {
  return axios.put(`${url}/delFriend/${data.userId}`, {
    friendId: data.friendId,
  });
};

export const useDelFriend = () => {
  return useMutation(delFriend);
};
