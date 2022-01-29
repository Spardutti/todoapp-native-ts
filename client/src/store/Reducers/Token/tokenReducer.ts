import { createSlice } from "@reduxjs/toolkit";

interface Token {
  token: string;
}

const initialState: Token = {
  token: "",
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    getToken(state, { payload }) {
      state.token = payload;
    },
  },
});

export const { getToken } = tokenSlice.actions;
export default tokenSlice.reducer;
