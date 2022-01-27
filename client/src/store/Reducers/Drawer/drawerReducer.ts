import { createSlice } from "@reduxjs/toolkit";

export interface DrawerState {
  isOpen: boolean;
}

const initialState: DrawerState = {
  isOpen: false,
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    toggleDrawer(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
