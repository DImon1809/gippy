import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { SiweMessage } from "@/shared/lib/types";

export const userApi = createApi({
  reducerPath: "githubApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://chat.gippy.ru/" }),
  refetchOnFocus: true,
  endpoints: builder => ({
    getCode: builder.query({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      query: (_: void) => ({
        url: "/api/users/auth/nonce",
        method: "GET",
      }),
    }),

    login: builder.mutation<
      { accessToken: string; address: string; name: string; email: string; notRegistered?: boolean },
      { address: string; signature: string; nonce: Omit<SiweMessage, "chainId"> & { chainId: number }; code: string }
    >({
      query: body => ({
        url: "/api/users/auth/login",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    register: builder.mutation<
      { accessToken: string; address: string; name: string; email: string },
      {
        signature: string;
        address: string;
        nonce: (Omit<SiweMessage, "chainId"> & { chainId: number }) | null;
        code: string;
        email: string;
        name: string;
      }
    >({
      query: body => ({
        url: "/api/users/auth/register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLazyGetCodeQuery, useLoginMutation, useRegisterMutation } = userApi;
