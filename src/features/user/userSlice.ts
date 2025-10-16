import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { userApi } from "@/features/user/userApi";

export interface IinitialState {
  userName: string;
  email: string;
  address: string;
  jwtToken: string;
  isAuthorized: boolean;
}

const initialState: IinitialState = {
  userName: "",
  email: "",
  address: "",
  isAuthorized: false,
  jwtToken: "",
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    loguot: () => {
      localStorage.removeItem("jwtToken");
      return initialState;
    },

    setAuthStatus: (state, action: PayloadAction<string>) => {
      state.isAuthorized = true;
      state.jwtToken = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addMatcher(
        userApi.endpoints.login.matchFulfilled,
        (state, action: PayloadAction<{ accessToken: string; address: string }>) => {
          state.isAuthorized = true;
          state.address = action.payload.address;
          state.jwtToken = action.payload.accessToken;
        },
      )
      .addMatcher(
        userApi.endpoints.register.matchFulfilled,
        (state, action: PayloadAction<{ accessToken: string; address: string }>) => {
          state.isAuthorized = true;
          state.address = action.payload.address;
          state.jwtToken = action.payload.accessToken;
        },
      );
  },
});

export const { loguot, setAuthStatus } = userSlice.actions;
