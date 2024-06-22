import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    name: "",
  },
  reducers: {
    changeNameFilter: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { changeNameFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
