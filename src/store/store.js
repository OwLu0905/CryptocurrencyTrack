import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../api/cryptoApi";
import { cryptoNewsApi } from "../api/cryptoNewsApi";
import favSlice from "../api/favSlice";
export const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    fav: favSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cryptoApi.middleware,
      cryptoNewsApi.middleware
    ),
});
