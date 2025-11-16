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
      localStorage.removeItem("userName");
      return initialState;
    },

    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
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
        (
          state,
          action: PayloadAction<{
            accessToken: string;
            address: string;
            name: string;
            email: string;
            notRegistered?: boolean;
          }>,
        ) => {
          if (action.payload?.notRegistered) {
            state.isAuthorized = false;
          } else {
            state.isAuthorized = true;
            state.address = action.payload.address;
            state.jwtToken = action.payload.accessToken;
            state.userName = action.payload.name;
          }
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

export const { loguot, setAuthStatus, setUserName } = userSlice.actions;
