import type { IImageData, IPrediction } from "@/shared/types/image";
import { apiSlice } from "../apiSlice";
import type { ISpecies } from "@/shared/types";

export const neuralModelEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClassifiers: builder.query<ISpecies[], string>({
      query: (id) => `/classifiers/${id}`,
      transformResponse: (response: { data: ISpecies[] }): ISpecies[] =>
        response.data,
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
