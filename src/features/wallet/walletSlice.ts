import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { SiweMessage } from "@/shared/lib/types";

type InitialState = {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  showNameModal: boolean | null;
  userName: string | null;
  signature: string;
  nonce: (Omit<SiweMessage, "chainId"> & { chainId: number }) | null;
  code: string;
};

const initialState: InitialState = {
  address: null,
  isConnected: true,
  isConnecting: false,
  error: null,
  showNameModal: null,
  userName: null,
  signature: "",
  nonce: null,
  code: "",
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
