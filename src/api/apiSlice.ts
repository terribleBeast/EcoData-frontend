import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiConfig } from "./config";

export const apiSlice = createApi({
  reducerPath: "api/v1",
  baseQuery: fetchBaseQuery(apiConfig),
  tagTypes: ["Researchers", "Researches", "Plants", "Labs", "Locations"],
  endpoints: () => ({}),
});
