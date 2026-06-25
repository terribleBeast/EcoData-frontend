import type {
  IResearcherDataFull,
  IResearcherData,
  ResearcherCreate,
} from "@/shared/types/researcher";
import { apiSlice } from "../apiSlice";

export const researcherEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getResearchers: builder.query<IResearcherDataFull[], void>({
      query: () => "/researchers",
      providesTags: [{ type: "Researchers", id: "LIST" }],
    }),
    getResearcherById: builder.query<IResearcherDataFull, string>({
      query: (id) => `/researchers/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Researchers", id }],
    }),
    getResearchersByIds: builder.query<IResearcherData[], IResearcherData[]>({
      query: (items) => {
        const req = `/researchers?${items.map((item) => `ids=${item.researcher_id}`).join("&")}`;
        console.log(req);
        return req;
      },
    }),

    createResearcher: builder.mutation<string, ResearcherCreate>({
      query: (researcher) => ({
        url: "/researchers",
        method: "POST",
        body: researcher,
      }),
      invalidatesTags: ["Researchers"],
    }),
    updateResearcher: builder.mutation<
      string,
      Partial<ResearcherCreate> & { entity_id: string }
    >({
      query: ({ entity_id, ...patch }) => ({
        url: `/researchers/${entity_id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (_result, _error, { entity_id }) => [
        { type: "Researchers", entity_id },
      ],
    }),
    deleteResearcher: builder.mutation<void, string>({
      query: (id) => ({
        url: `/researchers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Researchers", id: "LIST" }],
    }),
  }),
});
export const {
  useGetResearchersQuery,
  useLazyGetResearchersByIdsQuery,
  useGetResearcherByIdQuery,
  useLazyGetResearcherByIdQuery,
  useGetResearchersByIdsQuery,
  useCreateResearcherMutation,
  useUpdateResearcherMutation,
  useDeleteResearcherMutation,
} = researcherEndpoints;
