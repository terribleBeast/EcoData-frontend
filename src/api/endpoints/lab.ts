import type {
  ILabDataFull,
  IOrganizationType,
} from "@/shared/types/lab";
import { apiSlice } from "../apiSlice";

export const labEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLabs: builder.query<ILabDataFull[], void>({
      query: () => "/laboratories",
      transformResponse: (response: { data: ILabDataFull[] }) =>
        response.data,
      providesTags: [{ type: "Labs", id: "LIST" }],
    }),
    getLabById: builder.query<ILabDataFull, number>({
      query: (id) => `/laboratories/${id}`,
      transformResponse: (response: { data: ILabDataFull }) =>
        response.data,
      providesTags: (response, error, arg) => [{ type: "Labs", id: arg }],
    }),
    getOrganizationTypes: builder.query<IOrganizationType[], void>({
      query: () => "/laboratories/organization-types",
      transformResponse: (response: { data: IOrganizationType[] }) =>
        response.data,
    }),
    createLab: builder.mutation<void, ILabDataFull>({
      query: (lab) => ({
        url: "/laboratories",
        method: "POST",
        body: lab,
      }),
      invalidatesTags: ["Labs"],
    }),
    editLab: builder.mutation<ILabDataFull, Partial<ILabDataFull>>({
      query: (lab) => ({
        url: `/laboratories/${lab.id}`,
        method: "PATCH",
        body: lab,
      }),
      invalidatesTags: (lab) => [{ type: "Labs", id: lab?.id }],
    }),
    deleteLab: builder.mutation<void, number>({
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
