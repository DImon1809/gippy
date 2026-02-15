import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

import type { RootType } from "@/app/store";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://chat.gippy.ru/",
  prepareHeaders: (headers, { getState }) => {
    const jwtToken = (getState() as RootType).userSlice.jwtToken || localStorage.getItem("jwtToken");

    if (jwtToken) {
      headers.set("authorization", `Bearer ${jwtToken}`);
    }

    return headers;
  },
});

const retryQuery = retry(baseQuery, {
  maxRetries: 0,
});

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  tagTypes: ["GetMessages"],
  baseQuery: retryQuery,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
