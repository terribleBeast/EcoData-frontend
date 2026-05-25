import type {
  IPredictionTable,
  IResearchData,
  IResearchDataFull,
} from "@/shared/types/research";
import { apiSlice } from "../apiSlice";

export const researchEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getResearches: builder.query<IResearchDataFull[], void>({
      query: () => "/researches",
      transformResponse: (response: {
        data: IResearchDataFull[];
      }): IResearchDataFull[] => response.data,
      transformErrorResponse: (response) => console.error(response.status),
    }),
    getResearchesByIds: builder.query<IResearchData[], number[]>({
      query: (ids) => `/researches/ids=${ids.join(",")}`,
      transformResponse: (response: {
        data: IResearchData[];
      }): IResearchData[] => response.data,
      transformErrorResponse: (response) => console.error(response.status),
    }),
    // TODO: now we get data from csv file
    getPrediction: builder.query<IPredictionTable, number>({
      query: (researchId) => `/researches/${researchId}/predictions`,
      transformResponse: (response: {
        data: IPredictionTable;
      }): IPredictionTable => response.data,
      transformErrorResponse: (response) => console.error(response.status),
    }),
  }),
});

export const {
  useLazyGetResearchesByIdsQuery,
  useLazyGetResearchesQuery,
  useGetResearchesQuery,
  useLazyGetPredictionQuery,
} = researchEndpoints;
