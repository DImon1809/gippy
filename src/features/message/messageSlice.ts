import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { authApi } from "./authApi";

type InitialState = {
  isAuthenticated: boolean;
  token: string | null;
};

const initialState: InitialState = {
  isAuthenticated: false,
  token: null,
};

export const messageSlice = createSlice({
  name: "messageSlice",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<InitialState>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.token = action.payload.token;
    },
    logout: () => initialState,
  },

  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, action: PayloadAction<string>) => {
        state.isAuthenticated = true;
        state.token = action.payload;
      },
    );

    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action: PayloadAction<string>) => {
        state.isAuthenticated = true;
        state.token = action.payload;
      },
    );
  },
});

export const { setAuth, logout } = authSlice.actions;
