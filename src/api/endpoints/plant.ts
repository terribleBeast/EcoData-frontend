import type {
  IPlantDataFull,
  PlantDescriptionNested,
  IGenus,
  ISpecies,
  ILeafType,
  ILifeForm,
  PlantCreate,
  PlantUpdate,
} from "@/shared/types/plant";
import { apiSlice } from "../apiSlice";

export const plantEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlants: builder.query<IPlantDataFull[], void>({
      query: () => "/plants",
      transformResponse: (response: { data: IPlantDataFull[] }) =>
        response.data,
      providesTags: [{ type: "Plants", id: "LIST" }],
    }),
    getPlantById: builder.query<IPlantDataFull, string>({
      query: (id) => `/plants/${id}`,
      transformResponse: (response: { data: IPlantDataFull }) => response.data,
      providesTags: (response, error, arg) => [{ type: "Plants", id: arg }],
    }),
    getPlantDescription: builder.query<PlantDescriptionNested, string>({
      query: (id) => `/plants/descriptions/${id}`,
      transformResponse: (response: { data: PlantDescriptionNested }) =>
        response.data,
    }),
    getGenera: builder.query<IGenus[], void>({
      query: () => "/plants/genera/",
      // transformResponse: (response: { data: IGenus[] }) => response,
      transformResponse: (response: IGenus[]) => response,
    }),
    getSpecies: builder.query<ISpecies[], string>({
      query: (genusId) => `/plants/species?genus_id=${genusId}`,
      // transformResponse: (response: { data: ISpecies[] }) => response.data,
      transformResponse: (response: ISpecies[]) => response,
    }),
    getLeafTypes: builder.query<ILeafType[], void>({
      query: () => "/plants/leaf-types",
      transformResponse: (response: { data: ILeafType[] }) => response.data,
    }),
    getLifeForms: builder.query<ILifeForm[], void>({
      query: () => "/plants/life-forms",
      transformResponse: (response: { data: ILifeForm[] }) => response.data,
    }),
    createPlant: builder.mutation<void, PlantCreate>({
      query: (plant) => ({
        url: "/plants",
        method: "POST",
        body: plant,
      }),
      invalidatesTags: ["Plants"],
    }),
    editPlant: builder.mutation<
      IPlantDataFull,
      PlantUpdate & { entity_id: string }
    >({
      query: ({ entity_id, ...plant }) => ({
        url: `/plants/${entity_id}`,
        method: "PATCH",
        body: plant,
      }),
      invalidatesTags: (_result, _error, { entity_id }) => [
        { type: "Plants", id: entity_id },
      ],
    }),
    deletePlant: builder.mutation<void, string>({
      query: (id) => ({
        url: `/plants/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Plants", id: "LIST" }],
    }),
  }),
});

export const {
  useGetPlantsQuery,
  useLazyGetPlantsQuery,
  useGetPlantByIdQuery,
  useLazyGetPlantByIdQuery,
  useGetPlantDescriptionQuery,
  useGetGeneraQuery,
  useLazyGetGeneraQuery,
  useGetSpeciesQuery,
  useLazyGetSpeciesQuery,
  useGetLeafTypesQuery,
  useGetLifeFormsQuery,
  useCreatePlantMutation,
  useEditPlantMutation,
  useDeletePlantMutation,
} = plantEndpoints;
