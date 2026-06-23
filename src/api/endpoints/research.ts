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
      }): IResearchDataFull[] => {
        return response.data;
      },
      providesTags: [{ type: "Researches", id: "LIST" }],
    }),
    getResearchById: builder.query<IResearchDataFull, number>({
      query: (id) => `/researches/${id}`,
      transformResponse: (response: { data: IResearchDataFull }) =>
        response.data,
      providesTags: (response, error, arg) => [{ type: "Researches", id: arg }],
    }),
    getResearchesByIds: builder.query<IResearchData[], number[]>({
      query: (ids) => `/researches?ids=${ids.join(",")}`,
      transformResponse: (response: {
        data: IResearchData[];
      }): IResearchData[] => {
        return response.data;
      },
    }),
    // TODO: now we get data from csv file
    getPrediction: builder.query<IPredictionTable, number>({
      query: (researchId) => `/researches/${researchId}/predictions`,
      transformResponse: (response: {
        data: IPredictionTable;
      }): IPredictionTable => response.data,
    }),
    createResearch: builder.mutation<void, IResearchDataFull>({
      query: (research) => ({
        url: "/researches",
        method: "POST",
        body: research,
      }),
      invalidatesTags: ["Researches"],
    }),
    editResearch: builder.mutation<
      IResearchDataFull,
      Partial<IResearchDataFull>
    >({
      query: (research) => ({
        url: `/researches/${research.id}`,
        method: "PATCH",
        body: research,
      }),
      invalidatesTags: (research) => [{ type: "Researches", id: research?.id }],
    }),
    deleteResearch: builder.mutation<void, number>({
      query: (id) => ({
        url: `/researches/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Researches", id: "LIST" }],
    }),
  }),
});

export const {
  useLazyGetResearchesByIdsQuery,
  useGetResearchesByIdsQuery,
  useLazyGetResearchesQuery,
  useGetResearchesQuery,
  useLazyGetPredictionQuery,
  useGetPredictionQuery,
  useLazyGetResearchByIdQuery,
  useGetResearchByIdQuery,
  useCreateResearchMutation,
  useEditResearchMutation,
  useDeleteResearchMutation,
} = researchEndpoints;
