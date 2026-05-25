import type { IClassifier } from "@/shared/types";
import { apiSlice } from "../apiSlice";

const plantEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSpecies: builder.query<IClassifier[], string>({
      query: (genus) => `/plants/search/${genus}`,
      transformResponse: (response: { data: IClassifier[] }) => response.data,
    }),
  }),
});

export const { useLazyGetSpeciesQuery } = plantEndpoints;
