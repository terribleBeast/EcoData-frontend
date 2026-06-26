import { apiSlice } from "../apiSlice";

export type LeafPlantAssignment = {
  leaf_id: string;
  plant_id: string;
};

export const leavesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    assignLeavesToPlants: builder.mutation<void, LeafPlantAssignment[]>({
      query: (assignments) => ({
        url: "/leaves/plant",
        method: "PUT",
        body: { assignments },
      }),
      invalidatesTags: ["Leaves"],
    }),
  }),
});

export const { useAssignLeavesToPlantsMutation } = leavesApi;
