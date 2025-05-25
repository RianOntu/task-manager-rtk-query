import { configureStore } from "@reduxjs/toolkit";
import baseApi from "../Api/baseApi";
import teamSliceReducer from "../Features/Team/TeamSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    team: teamSliceReducer,
   
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(baseApi.middleware),
});
