import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "githubApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://217.26.30.64" }),
  refetchOnFocus: true,
  endpoints: builder => ({
    getCode: builder.query({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      query: (_: void) => ({
        url: "/api/users/auth/nonce",
        method: "GET",
      }),
    }),

    login: builder.mutation<string, { address: string; signature: string; nonce: string; code: string }>({
      query: data => ({
        url: "/api/users/auth/login",
        method: "POST",
        body: data,
        // body: {
        //   code: data.code,
        //   address: "0x19C4535D4b50d7F327018FAe60a542BAC07734a7",
        //   signature:
        //     "0x81c56e6ea02ec8fedd1ce393b08a65f311c8d0c7aaf0033cac5e82fec9791a9f0f75d9cc609f2760adaf888a4e2175b114033efcd25fd107546895a18bad519a1b",
        //   nonce: "Hello World",
        // },
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(data),
        // body: JSON.stringify({
        //   address: "0x19C4535D4b50d7F327018FAe60a542BAC07734a7",
        //   signature:
        //     "0x81c56e6ea02ec8fedd1ce393b08a65f311c8d0c7aaf0033cac5e82fec9791a9f0f75d9cc609f2760adaf888a4e2175b114033efcd25fd107546895a18bad519a1b",
        //   nonce: "Hello World",
        // }),
        // headers: {
        //   "Content-Type": "application/json",
        // },
      }),
    }),

    register: builder.mutation({
      queryFn: async (body: { address: string; userName: string; email: string }) => {
        const response = await fetch("http://localhost:4000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return { data };
      },
    }),
  }),
});

export const { useLazyGetCodeQuery, useLoginMutation, useRegisterMutation } = userApi;
