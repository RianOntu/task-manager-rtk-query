/* eslint-disable no-unused-vars */
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.REACT_APP_API_URL,
  }),
  tagTypes: [],
  endpoints: (builder) => ({}),
});

export default baseApi;
