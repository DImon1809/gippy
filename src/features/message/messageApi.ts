import { serviceApi } from "../serviceApi";

const messageApi = serviceApi.injectEndpoints({
  endpoints: builder => ({
    sendMyMessage: builder.mutation<
      {
        response: string;
        session_id: string;
        status: string;
        timestamp: string;
        transaction: {
          chainId: string;
          data: string;
          from: string;
          gas: string | null;
          gasPrice: string | null;
          nonce: string | null;
          to: string;
          value: string;
        } | null;
      },
      { query: string; session_id: string; chainId?: string }
    >({
      query: ({ query, session_id, chainId = 137 }) => ({
        url: "/query",
        method: "post",
        body: {
          query,
          session_id,
          chainId,
        },
      }),
    }),
  }),
});

export const { useSendMyMessageMutation } = messageApi;
