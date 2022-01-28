import { configureStore } from "@reduxjs/toolkit";
import drawerReducer from "./Reducers/Drawer/drawerReducer";
import userReducer from "./Reducers/User/userReducer";
import tokenReducer from "./Reducers/Token/tokenReducer";

export const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    user: userReducer,
    token: tokenReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
