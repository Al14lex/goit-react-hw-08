import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { resetContactsState } from "../contacts/slice"

axios.defaults.baseURL = "https://connections-api.goit.global/";

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (newUser, thunkAPI) => {
    try {
      if (!newUser.name || !newUser.email || !newUser.password) {
        throw new Error("All fields are required");
      }
      const res = await axios.post("/users/signup", newUser);
      setAuthHeader(res.data.token);
      thunkAPI.dispatch(resetContactsState());
      return res.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.code === 11000) {
        return thunkAPI.rejectWithValue("Email already exists");
      }
      console.error("Registration error:", error.response ? error.response.data : error.message);
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (userInfo, thunkAPI) => {
    try {
      const res = await axios.post("/users/login", userInfo);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    clearAuthHeader();
    thunkAPI.dispatch(resetContactsState());
  } catch (error) {
    console.error("Logout error:", error.response ? error.response.data : error.message);
    return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const refreshUser = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
  const reduxState = thunkAPI.getState();
  setAuthHeader(reduxState.auth.token);

  const res = await axios.get("/users/current");
  return res.data;
},
  {
    condition(_, thunkAPI) {
      const reduxState = thunkAPI.getState();
      return reduxState.auth.token !== null;
    }
  }
);