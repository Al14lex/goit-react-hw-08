import { combineReducers, configureStore } from "@reduxjs/toolkit";
import contactReducer  from "./contacts/slice";
import { filterReducer } from "./filters/slice";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import persistStore from "redux-persist/es/persistStore";
import authReducer from "./auth/slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ['token'],
};

const rootReducer = combineReducers({
  contacts: contactReducer,
  filters: filterReducer,
  auth: persistReducer(authPersistConfig, authReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);