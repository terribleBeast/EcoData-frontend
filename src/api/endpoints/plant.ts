import type {
  IGenus,
  ILeafType,
  ILifeForm,
  ILocation,
  IPlantDataFull,
  IPlantDescriptionFull,
  IPlantFormData,
  ISpecies,
  UUID,
} from "@/shared/types/plant";

import { apiSlice } from "../apiSlice";

type ApiObject = Record<string, any>;

const uuidOrNull = (value: UUID | "" | null | undefined): UUID | null =>
  value ? value : null;

const normalizeGenus = (raw: ApiObject): IGenus => ({
  id: raw.id ?? raw.genus_id,
  latin_name: raw.latin_name,
  russian_name: raw.russian_name ?? null,
});

const normalizeSpecies = (raw: ApiObject): ISpecies => {
  const genus = raw.genus ? normalizeGenus(raw.genus) : null;

  return {
    id: raw.id ?? raw.species_id,
    genus_id: raw.genus_id ?? genus?.id ?? null,
    latin_name: raw.latin_name,
    russian_name: raw.russian_name ?? null,
    genus,
  };
};

const normalizeLeafType = (raw: ApiObject): ILeafType => ({
  id: raw.id ?? raw.leaf_blade_type_id,
  name: raw.name,
});

const normalizeLifeForm = (raw: ApiObject): ILifeForm => ({
  id: raw.id ?? raw.plant_life_form_id,
  name: raw.name,
});

const normalizeLocation = (raw: ApiObject): ILocation => ({
  id: raw.id ?? raw.location_id,
  address_id: raw.address_id ?? null,
  latitude: raw.latitude ?? null,
  longitude: raw.longitude ?? null,
  description: raw.description ?? null,
});

const normalizePlantDescription = (raw: ApiObject): IPlantDescriptionFull => {
  const species = raw.species ? normalizeSpecies(raw.species) : null;
  const leafBladeType = raw.leaf_blade_type
    ? normalizeLeafType(raw.leaf_blade_type)
    : null;
  const plantLifeForm = raw.plant_life_form
    ? normalizeLifeForm(raw.plant_life_form)
    : null;

  return {
    id: raw.id ?? raw.plant_description_id,
    species_id: raw.species_id ?? species?.id ?? null,
    plant_life_form_id: raw.plant_life_form_id ?? plantLifeForm?.id ?? null,
    leaf_blade_type_id: raw.leaf_blade_type_id ?? leafBladeType?.id ?? null,
    description: raw.description ?? null,
    species,
    genus: species?.genus ?? null,
    leaf_blade_type: leafBladeType,
    plant_life_form: plantLifeForm,
  };
};

const normalizePlant = (raw: ApiObject): IPlantDataFull => {
  const location = raw.location ? normalizeLocation(raw.location) : null;
  const plantDescription = raw.plant_description
    ? normalizePlantDescription(raw.plant_description)
    : null;

  return {
    id: raw.id ?? raw.plant_id,
    location_id: raw.location_id ?? location?.id ?? null,
    plant_description_id:
      raw.plant_description_id ?? plantDescription?.id ?? null,
    description: raw.description ?? null,
    location,
    plant_description: plantDescription,
  };
};

const plantDescriptionBody = (plant: IPlantFormData) => ({
  species_id: uuidOrNull(plant.species_id),
  plant_life_form_id: uuidOrNull(plant.plant_life_form_id),
  leaf_blade_type_id: uuidOrNull(plant.leaf_blade_type_id),
  description: plant.plant_description_text ?? null,
});

const plantBody = (
  plant: Pick<IPlantFormData, "location_id" | "description">,
  plantDescriptionId: UUID | null,
) => ({
  location_id: uuidOrNull(plant.location_id),
  plant_description_id: plantDescriptionId,
  description: plant.description ?? null,
});

export const plantEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlants: builder.query<IPlantDataFull[], void>({
      query: () => "/plants/",
      transformResponse: (response: ApiObject[]) =>
        response.map(normalizePlant),
      providesTags: [{ type: "Plants", id: "LIST" }],
    }),

    getPlantById: builder.query<IPlantDataFull, UUID>({
      query: (id) => `/plants/${id}`,
      transformResponse: (response: ApiObject) => normalizePlant(response),
      providesTags: (_response, _error, id) => [{ type: "Plants", id }],
    }),

    getPlantDescription: builder.query<IPlantDescriptionFull, UUID>({
      query: (id) => `/plant-descriptions/${id}`,
      transformResponse: (response: ApiObject) =>
        normalizePlantDescription(response),
    }),

    getPlantDescriptions: builder.query<IPlantDescriptionFull[], void>({
      query: () => "/plant-descriptions/",
      transformResponse: (response: ApiObject[]) =>
        response.map(normalizePlantDescription),
      providesTags: [{ type: "Plants", id: "DESCRIPTIONS" }],
    }),

    getGenera: builder.query<IGenus[], void>({
      query: () => "/plants/genera/",
      transformResponse: (response: ApiObject[]) =>
        response.map(normalizeGenus),
    }),

    getSpecies: builder.query<ISpecies[], UUID | void>({
      query: (genusId) =>
        genusId ? `/species/?genus_id=${genusId}` : "/species/",
      transformResponse: (response: ApiObject[]) =>
        response.map(normalizeSpecies),
    }),

    getAllSpecies: builder.query<ISpecies[], void>({
      query: () => "/species/",
      transformResponse: (response: ApiObject[]) =>
        response.map(normalizeSpecies),
    }),

    getLeafTypes: builder.query<ILeafType[], void>({
      query: () => "/leaf-blade-types/",
      transformResponse: (response: ApiObject[]) =>
        response.map(normalizeLeafType),
    }),

    getLifeForms: builder.query<ILifeForm[], void>({
      query: () => "/plant-life-forms/",
      transformResponse: (response: ApiObject[]) =>
        response.map(normalizeLifeForm),
    }),

    getPlantLocations: builder.query<ILocation[], void>({
      query: () => "/locations/",
      transformResponse: (response: ApiObject[]) =>
        response.map(normalizeLocation),
    }),

    createPlant: builder.mutation<UUID, IPlantFormData>({
      async queryFn(plant, _api, _extraOptions, fetchWithBQ) {
        const descriptionResult = await fetchWithBQ({
          url: "/plant-descriptions/",
          method: "POST",
          body: plantDescriptionBody(plant),
        });

        if (descriptionResult.error) {
          return { error: descriptionResult.error };
        }

        const plantDescriptionId = descriptionResult.data as UUID;

        const plantResult = await fetchWithBQ({
          url: "/plants/",
          method: "POST",
          body: plantBody(plant, plantDescriptionId),
        });

        if (plantResult.error) {
          return { error: plantResult.error };
        }

        return { data: plantResult.data as UUID };
      },
      invalidatesTags: [
        { type: "Plants", id: "LIST" },
        { type: "Plants", id: "DESCRIPTIONS" },
      ],
    }),

    editPlant: builder.mutation<UUID, Partial<IPlantFormData> & { id: UUID }>({
      async queryFn(plant, _api, _extraOptions, fetchWithBQ) {
        let plantDescriptionId = plant.plant_description_id ?? null;

        const hasDescriptionFields =
          plant.species_id !== undefined ||
          plant.leaf_blade_type_id !== undefined ||
          plant.plant_life_form_id !== undefined ||
          plant.plant_description_text !== undefined;

        if (hasDescriptionFields) {
          if (plantDescriptionId) {
            const descriptionResult = await fetchWithBQ({
              url: `/plant-descriptions/${plantDescriptionId}`,
              method: "PATCH",
              body: plantDescriptionBody(plant as IPlantFormData),
            });

            if (descriptionResult.error) {
              return { error: descriptionResult.error };
            }
          } else {
            const descriptionResult = await fetchWithBQ({
              url: "/plant-descriptions/",
              method: "POST",
              body: plantDescriptionBody(plant as IPlantFormData),
            });

            if (descriptionResult.error) {
              return { error: descriptionResult.error };
            }

            plantDescriptionId = descriptionResult.data as UUID;
          }
        }

        const plantResult = await fetchWithBQ({
          url: `/plants/${plant.id}`,
          method: "PATCH",
          body: plantBody(plant, plantDescriptionId),
        });

        if (plantResult.error) {
          return { error: plantResult.error };
        }

        return { data: plantResult.data as UUID };
      },
      invalidatesTags: (_response, _error, plant) => [
        { type: "Plants", id: plant.id },
        { type: "Plants", id: "LIST" },
        { type: "Plants", id: "DESCRIPTIONS" },
      ],
    }),

    deletePlant: builder.mutation<void, UUID>({
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
  useGetPlantDescriptionsQuery,
  useGetGeneraQuery,
  useLazyGetGeneraQuery,
  useGetSpeciesQuery,
  useLazyGetSpeciesQuery,
  useGetAllSpeciesQuery,
  useGetLeafTypesQuery,
  useGetLifeFormsQuery,
  useGetPlantLocationsQuery,
  useCreatePlantMutation,
  useEditPlantMutation,
  useDeletePlantMutation,
} = plantEndpoints;
