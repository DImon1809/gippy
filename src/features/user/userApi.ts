import { serviceApi } from "@/features/serviceApi";

export const userApi = serviceApi.injectEndpoints({
  endpoints: builder => ({
    getCode: builder.query({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      queryFn: async (_: void) => {
        const response = await fetch("http://localhost:4000/api/code");
        const data = await response.json();
        return { data };
      },
    }),

    login: builder.mutation({
      queryFn: async (body: { address: string; signature: string; nonce: string }) => {
        const response = await fetch("http://localhost:4000/api/auth/login", {
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
