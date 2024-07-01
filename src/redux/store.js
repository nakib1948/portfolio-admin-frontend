import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";
import { baseApi } from "./api/baseApi";
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
