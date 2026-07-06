import type {
  IPredictionTable,
  IResearchData,
  IResearchDataFull,
  UUID,
} from "@/shared/types/research";

import { apiSlice } from "../apiSlice";

export const researchEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getResearches: builder.query<IResearchDataFull[], void>({
      query: () => "/researches/",
      transformResponse: (
        response: IResearchDataFull[] | { data: IResearchDataFull[] },
      ) => (Array.isArray(response) ? response : response.data),
      providesTags: [{ type: "Researches", id: "LIST" }],
    }),

    getResearchById: builder.query<IResearchDataFull, UUID>({
      query: (id) => `/researches/${id}`,
      transformResponse: (
        response: IResearchDataFull | { data: IResearchDataFull },
      ) => ("data" in response ? response.data : response),
      providesTags: (_response, _error, id) => [{ type: "Researches", id }],
    }),

    getResearchesByIds: builder.query<IResearchData[], UUID[]>({
      async queryFn(ids, _api, _extraOptions, fetchWithBQ) {
        const result = await fetchWithBQ("/researches/");

        if (result.error) {
          return { error: result.error };
        }

        const data = result.data as
          | IResearchDataFull[]
          | { data: IResearchDataFull[] };
        const researches = Array.isArray(data) ? data : data.data;

        return {
          data: researches.filter((research) =>
            ids.includes(research.id ?? research.research_id),
          ),
        };
      },
    }),

    getPrediction: builder.query<IPredictionTable, UUID>({
      query: (researchId) => `/researches/${researchId}/predictions`,
      transformResponse: (
        response: IPredictionTable | { data: IPredictionTable },
      ) => ("data" in response ? response.data : response),
    }),

    createResearch: builder.mutation<UUID, Partial<IResearchDataFull>>({
      query: (research) => ({
        url: "/researches/",
        method: "POST",
        body: research,
      }),
      invalidatesTags: [{ type: "Researches", id: "LIST" }],
    }),

    editResearch: builder.mutation<
      UUID,
      Partial<IResearchDataFull> & { entity_id: UUID }
    >({
      query: ({ entity_id, ...research }) => ({
        url: `/researches/${entity_id}`,
        method: "PATCH",
        body: research,
      }),
      invalidatesTags: (_response, _error, { entity_id }) => [
        { type: "Researches", id: entity_id },
        { type: "Researches", id: "LIST" },
      ],
    }),

    deleteResearch: builder.mutation<void, UUID>({
      query: (id) => ({
        url: `/researches/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Researches", id: "LIST" }],
    }),

    inviteResearchers: builder.mutation<
      void,
      { research_id: UUID; body: { researcher_ids: UUID[] } }
    >({
      query: ({ research_id, body }) => ({
        url: `/researches/invite/${research_id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_response, _error, { research_id }) => [
        { type: "Researches", id: research_id },
        { type: "Researches", id: "LIST" },
      ],
    }),

    separateResearchers: builder.mutation<
      void,
      { research_id: UUID; body: { researcher_ids: UUID[] } }
    >({
      query: ({ research_id, body }) => ({
        url: `/researches/seprate/${research_id}`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: (_response, _error, { research_id }) => [
        { type: "Researches", id: research_id },
        { type: "Researches", id: "LIST" },
      ],
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
  useInviteResearchersMutation,
  useSeparateResearchersMutation,
} = researchEndpoints;
