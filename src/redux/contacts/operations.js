import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setContactsLoaded } from "./slice";

const BASE_URL = "https://66616c5d63e6a0189fe9c159.mockapi.io/contacts";

export const fetchContacts = createAsyncThunk("contacts/fetchAll",
    async (_, { dispatch, getState, rejectWithValue }) => {
    const state = getState();
    if (state.contacts.contactsLoaded) {
      return state.contacts.items;
    }
    try {
      const response = await axios.get(BASE_URL);
      dispatch(setContactsLoaded());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async ({ name, phone }, thunkAPI) => {
    try {
      const response = await axios.post(BASE_URL, { name, phone });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);