import type { IPrediction } from "@/shared/types/image";
import { apiSlice } from "../apiSlice";
import type { ISpecies } from "@/shared/types";

type NeuralModelResponse = {
  neural_model_id: string;
  file: {
    file_id: string;
    original_filename: string;
  };
  species: {
    species_id: string;
    latin_name: string;
  };
  model_type: string;
  input_format: string;
  output_format: string;
  is_active: boolean;
  created_at: string;
};

export const neuralModelEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableSpeciesByGenus: builder.query<ISpecies[], string>({
      query: (genusId) => `/analyzer/available-species/${genusId}`,
    }),
    updatePrediction: builder.mutation<
      IPrediction[],
      { file: File; genus_id: string }
    >({
      query: ({ file, genus_id }) => {
        const formData = new FormData();
        formData.append("image", file);
        return {
          url: `/classifiers/predictions/${genus_id}`,
          method: "POST",
          body: formData,
        };
      },
      transformResponse: (response: { data: IPrediction[] }): IPrediction[] => {
        console.log(response, response.data);
        return response.data;
      },
    }),
  }),
});

export const {
  useUpdatePredictionMutation,
  useGetAvailableSpeciesByGenusQuery,
  useLazyGetAvailableSpeciesByGenusQuery,
} = neuralModelEndpoints;
