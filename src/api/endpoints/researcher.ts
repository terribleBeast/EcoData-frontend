import type {
  IResearcherDataFull,
  IResearcherData,
} from "@/shared/types/researcher";
import { apiSlice } from "../apiSlice";

export const researcherEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getResearcher: builder.query<IUserDataAuth, void>({
    //   query: () => "/researcher",

    // }),
    getResearchers: builder.query<IResearcherDataFull[], void>({
      query: () => "/researchers",
      transformResponse: (response: {
        data: IResearcherDataFull[];
      }): IResearcherDataFull[] => response.data,
    }),
    getResearchersByIds: builder.query<IResearcherData[], number[]>({
      query: (ids) => `/researchers/ids=${ids.join(",")}`,
      transformResponse: (response: { data: IResearcherData[] }) =>
        response.data,
      transformErrorResponse: (response) => console.error(response.status),
    }),
  }),
});
export const {
  useLazyGetResearchersQuery,
  useGetResearchersQuery,
  useLazyGetResearchersByIdsQuery,
} = researcherEndpoints;
