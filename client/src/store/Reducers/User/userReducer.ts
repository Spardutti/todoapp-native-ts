import { createSlice } from "@reduxjs/toolkit";

export interface User {
  username: string | null;
  _id: string | null;
  email: string | null;
}

const initialState: User = {
  username: null,
  _id: null,
  email: null,
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
