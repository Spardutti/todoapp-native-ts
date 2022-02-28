import { createSlice } from "@reduxjs/toolkit";

export interface User {
  username: string | undefined;
  _id: string | undefined;
  email: string | undefined;
}

const initialState: User = {
  username: "",
  _id: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserInfo(state, action) {
      const { username, _id, email } = action.payload;

      state.email = email;
      state._id = _id;
      state.username = username;
    },
  },
});

export const { getUserInfo } = userSlice.actions;

export default userSlice.reducer;
