import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";


const AuthPersistConfig = {
  key: "auth",
  storage,
};

const UserPersistConfig = {
  key: "user",
  storage,
};

const AuthPersistedReducer = persistReducer(AuthPersistConfig, authReducer);
const UserPersistedReducer = persistReducer(UserPersistConfig, userReducer);

const rootReducer = combineReducers({
  auth: AuthPersistedReducer,
  user: UserPersistedReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (
    getDefaultMiddleware: (arg0: {
      serializableCheck: {
        ignoredActions: (
          | "persist/FLUSH"
          | "persist/REHYDRATE"
          | "persist/PAUSE"
          | "persist/PERSIST"
          | "persist/PURGE"
          | "persist/REGISTER"
        )[];
      };
    }) => any
  ) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);

export default store;

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
