import type {
  IResearchData,
  IResearchDataFull,
  ResearchAssignResearchers,
} from "@/shared/types/research";
import { apiSlice } from "../apiSlice";

export const researchEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getResearches: builder.query<IResearchDataFull[], void>({
      query: () => "/researches",
      providesTags: [{ type: "Researches", id: "LIST" }],
    }),
    getResearchById: builder.query<IResearchDataFull, string>({
      query: (id) => `/researches/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Researches", id }],
    }),
    getResearchesByIds: builder.query<IResearchData[], string[]>({
      query: (ids) => `/researches?ids=${ids.join(",")}`,
    }),
    createResearch: builder.mutation<string, IResearchDataFull>({
      query: (research) => ({
        url: "/researches",
        method: "POST",
        body: research,
      }),
      invalidatesTags: ["Researches"],
    }),
    updateResearch: builder.mutation<
      string,
      Partial<IResearchDataFull> & { entity_id: string }
    >({
      query: ({ entity_id, ...patch }) => ({
        url: `/researches/${entity_id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (_result, _error, { entity_id }) => [
        { type: "Researches", entity_id },
      ],
    }),
    deleteResearch: builder.mutation<void, string>({
      query: (id) => ({
        url: `/researches/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Researches", id: "LIST" }],
    }),
    // ── Researcher assignment ──
    inviteResearchers: builder.mutation<
      void,
      { research_id: string; body: ResearchAssignResearchers }
    >({
      query: ({ research_id, body }) => ({
        url: `/researches/invite/${research_id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, { research_id }) => [
        { type: "Researches", id: research_id },
      ],
    }),
    separateResearchers: builder.mutation<
      void,
      { research_id: string; body: ResearchAssignResearchers }
    >({
      query: ({ research_id, body }) => ({
        url: `/researches/seprate/${research_id}`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: (_result, _error, { research_id }) => [
        { type: "Researches", id: research_id },
      ],
    }),
  }),
});

export const {
  useLazyGetResearchesByIdsQuery,
  useGetResearchesByIdsQuery,
  useLazyGetResearchesQuery,
  useGetResearchesQuery,
  useLazyGetResearchByIdQuery,
  useGetResearchByIdQuery,
  useCreateResearchMutation,
  useUpdateResearchMutation,
  useDeleteResearchMutation,
  useInviteResearchersMutation,
  useSeparateResearchersMutation,
} = researchEndpoints;
