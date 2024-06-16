import { createSlice } from "@reduxjs/toolkit";
import { logIn, logOut, register} from "./operations";

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(register.pending, state => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = {
          name: null,
          email: null,
        };
        state.token = null;
        state.isLoggedIn = false;
      }),
      // .addCase(refreshUser.fulfilled, (state, action) => {
      //   state.token = action.payload.token;
      //   state.isLoggedIn = true;
      // })
      // .addCase(refreshUser.rejected, (state, action) => {
      //   console.error("Refresh user failed:", action.error.message);
      // }),
});

export default authSlice.reducer;