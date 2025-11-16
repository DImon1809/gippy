import { serviceApi } from "@/features/serviceApi";
import type { Message } from "@/shared/config/Message";

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
      { query: string; session_id: string; chainId?: number }
    >({
      query: ({ query, session_id, chainId = 137 }) => ({
        url: "/api/gippy/query",
        method: "POST",
        body: {
          query,
          session_id,
          chainId,
        },
      }),
    }),

    getHistoryMessage: builder.query<
      {
        session_id: string;
        messages: Message[];
        count: number;
      },
      {
        session_id: string;
        limit?: number;
      }
    >({
      query: ({ limit = 50, session_id }) => ({
        url: `/api/gippy/sessions/${session_id}/messages`,
        method: "GET",
        params: {
          limit,
        },
      }),
      providesTags: ["GetMessages"],
    }),

    clearHistoryMessage: builder.mutation<void, { session_id: string }>({
      query: ({ session_id }) => ({
        url: "/api/gippy/clear_session",
        method: "POST",
        params: { session_id },
      }),
      invalidatesTags: ["GetMessages"],
    }),
  }),
});

export const { useSendMyMessageMutation, useGetHistoryMessageQuery, useClearHistoryMessageMutation } = messageApi;
