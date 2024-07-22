import { configureStore } from "@reduxjs/toolkit";
import { orderApi } from "../apis/orderApi";
import { categoryApi } from "../apis/categoryApi";

export const store = configureStore({
  reducer: {
    [orderApi.reducerPath]: orderApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
        orderApi.middleware,
        categoryApi.middleware
    )
  }
});

