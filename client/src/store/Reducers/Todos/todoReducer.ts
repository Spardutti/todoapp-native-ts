import { createSlice } from "@reduxjs/toolkit";

interface Todos {
  overdue: number;
  today: number;
  completed: number;
}

const initialState: Todos = {
  overdue: 0,
  today: 0,
  completed: 0,
};

export const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos(state, { payload }) {
      state.today = payload;
    },
    setOverdue(state, { payload }) {
      state.overdue = payload;
    },
    setCompleted(state, { payload }) {
      state.completed = payload;
    },
  },
});

export const { setTodos, setOverdue } = TodoSlice.actions;

export default TodoSlice.reducer;
