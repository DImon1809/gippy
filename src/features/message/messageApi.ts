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
      { query: string }
    >({
      query: ({ query }) => ({
        url: "/query",
        method: "post",
        body: {
          query,
          session_id: "0xfaff5bf2571ab509ad8165fa56e72dd3d9680a50",
        },
      }),
    }),
  }),
});

export const { useSendMyMessageMutation } = messageApi;
