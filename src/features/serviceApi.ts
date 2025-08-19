import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000",
});

const retryQuery = retry(baseQuery, {
  maxRetries: 0,
});

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: retryQuery,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
