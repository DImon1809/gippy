import type { PayloadAction } from "@reduxjs/toolkit";
import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";

import { userApi } from "@/features/user/userApi";

export const authMiddleware = createListenerMiddleware();

authMiddleware.startListening({
  matcher: isAnyOf(userApi.endpoints.login.matchFulfilled, userApi.endpoints.register.matchFulfilled),
  effect: async (
    action: PayloadAction<{ accessToken: string; address: string; name: string; email: string }>,
    listenerApi,
  ) => {
    listenerApi.cancelActiveListeners();

    if (action.payload.accessToken) {
      localStorage.setItem("jwtToken", action.payload.accessToken);
    }

    if (action.payload?.name) {
      localStorage.setItem("userName", action.payload.name);
    }
  },
});
