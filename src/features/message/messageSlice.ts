import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface IinitialState {
  isHaveMessages: boolean;
}

const initialState: IinitialState = {
  isHaveMessages: false,
};

export const messageSlice = createSlice({
  name: "messageSlice",
  initialState,
  reducers: {
    setIsHaveMessages: (state, action: PayloadAction<boolean>) => {
      state.isHaveMessages = action.payload;
    },
  },
});

export const { setIsHaveMessages } = messageSlice.actions;
