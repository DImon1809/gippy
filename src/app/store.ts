import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { authMiddleware } from "@/app/providers/middleware/authMiddleware";
import { serviceApi } from "@/features/serviceApi";
import { userSlice } from "@/features/user/userSlice";
import { walletSlice } from "@/features/wallet/walletSlice";

const apiMiddleware = [serviceApi.middleware, authMiddleware.middleware];

export const store = configureStore({
  reducer: {
    [serviceApi.reducerPath]: serviceApi.reducer,
    [walletSlice.reducerPath]: walletSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiMiddleware),
  devTools: { name: "Gippy" },
});

export type RootType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootType> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
