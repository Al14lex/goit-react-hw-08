import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    name: "",
    phone: "",
  },
  reducers: {
    changeNameFilter: (state, action) => {
      state.name = action.payload;
    },
    changePhoneFilter: (state, action) => {
      state.phone = action.payload;
    },
  },
});

export const { changeNameFilter, changePhoneFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
