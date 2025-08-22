import { serviceApi } from "../serviceApi";

const messageApi = serviceApi.injectEndpoints({
  endpoints: builder => ({
    sendMyMessage: builder.mutation<
      {
        response: string;
        session_id: string;
        status: string;
        timestamp: string;
      },
      { query: string; session_id: string }
    >({
      query: ({ query, session_id }) => ({
        url: "/query",
        method: "post",
        body: {
          query,
          session_id,
        },
      }),
    }),
  }),
});

export const { useSendMyMessageMutation } = messageApi;
