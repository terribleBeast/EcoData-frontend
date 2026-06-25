import type {
  ILabDataFull,
  IOrganizationType,
  LaboratoryCreate,
  LaboratoryUpdate,
} from "@/shared/types/lab";
import { apiSlice } from "../apiSlice";

export const labEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLabs: builder.query<ILabDataFull[], void>({
      query: () => "/laboratories",
      transformResponse: (response: { data: ILabDataFull[] }) => response.data,
      providesTags: [{ type: "Labs", id: "LIST" }],
    }),
    getLabById: builder.query<ILabDataFull, string>({
      query: (id) => `/laboratories/${id}`,
      transformResponse: (response: { data: ILabDataFull }) => response.data,
      providesTags: (response, error, arg) => [{ type: "Labs", id: arg }],
    }),
    getOrganizationTypes: builder.query<IOrganizationType[], void>({
      query: () => "/laboratories/organization-types",
      transformResponse: (response: { data: IOrganizationType[] }) =>
        response.data,
    }),
    createLab: builder.mutation<void, LaboratoryCreate>({
      query: (lab) => ({
        url: "/laboratories",
        method: "POST",
        body: lab,
      }),
      invalidatesTags: ["Labs"],
    }),
    editLab: builder.mutation<
      ILabDataFull,
      LaboratoryUpdate & { entity_id: string }
    >({
      query: ({ entity_id, ...lab }) => ({
        url: `/laboratories/${entity_id}`,
        method: "PATCH",
        body: lab,
      }),
      invalidatesTags: (_result, _error, { entity_id }) => [
        { type: "Labs", id: entity_id },
      ],
    }),
    deleteLab: builder.mutation<void, string>({
      query: (id) => ({
        url: `/laboratories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Labs", id: "LIST" }],
    }),
  }),
});

export const {
  useGetLabsQuery,
  useLazyGetLabsQuery,
  useGetLabByIdQuery,
  useLazyGetLabByIdQuery,
  useGetOrganizationTypesQuery,
  useCreateLabMutation,
  useEditLabMutation,
  useDeleteLabMutation,
} = labEndpoints;
