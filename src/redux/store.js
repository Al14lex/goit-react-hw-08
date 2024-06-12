import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { contactReducer } from "./contactsSlice";
import { filterReducer } from "./filtersSlice";

const rootReducer = combineReducers({
  contacts: contactReducer,
  filters: filterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

