import { createSlice } from "@reduxjs/toolkit";

export const updateSearchSlice = createSlice({
  name: "updateSearch",
  initialState: false,
  reducers: {
    updateSearch: (state) => {
      return (state = !state);
    },
  },
});
export const { updateSearch } = updateSearchSlice.actions;
