
import { createSlice} from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./operations";
import { logOut, register } from "../auth/operations";


const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
    contactsLoaded: false,
  },
  reducers: {
    setContactsLoaded(state) {
      state.contactsLoaded = true;
    },
    resetContactsState(state) {
      state.items = [];
      state.loading = false;
      state.error = null;
      state.contactsLoaded = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) { 
          state.items = action.payload;
        }
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((contact) => contact.id !== action.payload);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        contactsSlice.caseReducers.resetContactsState(state);
      })
    .addCase(register.fulfilled, (state) => {
        contactsSlice.caseReducers.resetContactsState(state);
      });
  },
});

export const { setContactsLoaded, resetContactsState } = contactsSlice.actions;
export default contactsSlice.reducer;