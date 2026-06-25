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
    getClassifiers: builder.query<ISpecies[], string>({
      query: (id) => ({
        url: `analyzer/models`,
        params: { genus_id: id },
      }),
      transformResponse: (response: NeuralModelResponse[]): ISpecies[] => {
        console.log(response[0].species);
        return response.map((item) => item.species);
      },
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
  useLazyGetClassifiersQuery,
  useGetClassifiersQuery,
} = neuralModelEndpoints;
