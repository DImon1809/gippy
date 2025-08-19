import { configureStore } from "@reduxjs/toolkit";

import { serviceApi } from "@/features/serviceApi";

const apiMiddleware = [serviceApi.middleware];

export const store = configureStore({
  reducer: {
    [serviceApi.reducerPath]: serviceApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiMiddleware),
  devTools: { name: "Gippy" },
});
