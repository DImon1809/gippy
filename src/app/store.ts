import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { authMiddleware } from "@/app/providers/middleware/authMiddleware";
import { messageSlice } from "@/features/message/messageSlice";
import { serviceApi } from "@/features/serviceApi";
import { userApi } from "@/features/user/userApi";
import { userSlice } from "@/features/user/userSlice";
import { walletSlice } from "@/features/wallet/walletSlice";

const apiMiddleware = [serviceApi.middleware, userApi.middleware, authMiddleware.middleware];

export const store = configureStore({
  reducer: {
    [serviceApi.reducerPath]: serviceApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [walletSlice.reducerPath]: walletSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
    [messageSlice.reducerPath]: messageSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiMiddleware),
  devTools: { name: "Gippy" },
});

export type RootType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootType> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
