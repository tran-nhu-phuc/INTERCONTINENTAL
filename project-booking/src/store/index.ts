import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./reducer/user";
import { updateSearchSlice } from "./reducer/update";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  updateSearch: updateSearchSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
