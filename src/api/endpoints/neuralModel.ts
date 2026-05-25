import type { IImageData, IPrediction } from "@/shared/types/image";
import { apiSlice } from "../apiSlice";

const neuralModelEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updatePrediction: builder.mutation<IPrediction[], IImageData>({
      query: (image) => `/neural-models/predictions/${image.classifier}`,
      transformResponse: (response: { data: IPrediction[] }): IPrediction[] =>
        response.data,
      transformErrorResponse: (response) => console.error(response.status),
    }),
  }),
});

export const { useUpdatePredictionMutation } = neuralModelEndpoints;
