import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "githubApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8081/", credentials: "include" }),
  refetchOnFocus: true,
  endpoints: builder => ({
    getCode: builder.query({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      query: (_: void) => ({
        url: "/api/users/auth/nonce",
        method: "GET",
      }),
    }),

    login: builder.mutation({
      query: (body: { address: string; signature: string; nonce: string; code: string }) => ({
        url: "/api/users/auth/login",
        method: "POST",
        body,
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
