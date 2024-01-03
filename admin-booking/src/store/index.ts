import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./reducer/user-reducer";

const rootReducer = combineReducers({
  user: userSlice.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
