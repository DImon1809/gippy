import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  showNameModal: boolean | null;
  userName: string | null;
};

const initialState: InitialState = {
  address: null,
  isConnected: true,
  isConnecting: false,
  error: null,
  showNameModal: null,
  userName: null,
};

export const walletSlice = createSlice({
  name: "walletSlice",
  initialState,
  reducers: {
    setWalletState: (state, action: PayloadAction<Partial<InitialState>>) => {
      const data = { ...state, ...action.payload };

      Object.assign(state, data);
    },
    resetWalletState: () => initialState,
  },
});

export const { setWalletState, resetWalletState } = walletSlice.actions;
