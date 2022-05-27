import { createSlice } from "@reduxjs/toolkit";

export interface User {
  username: string | undefined;
  _id: string | undefined;
  email: string | undefined;
  friends: [{ id: string; friendName: string }] | undefined;
  friendRequests:
    | [{ status: string; id: string; friendName: string }]
    | undefined;
}

const initialState: User = {
  username: "",
  _id: "",
  email: "",
  friends: [{ id: "", friendName: "" }],
  friendRequests: [{ status: "", id: "", friendName: "" }],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserInfo(state, action) {
      const { username, _id, email, friends, friendRequests } = action.payload;

      state.email = email;
      state._id = _id;
      state.username = username;
      state.friends = friends;
      state.friendRequests = friendRequests;
    },
  },
});

export const { getUserInfo } = userSlice.actions;

export default userSlice.reducer;
