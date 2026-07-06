import { apiSlice } from "../apiSlice";

export type LeafSaveItem = {
  client_leaf_id?: string;
  leaf_id?: string;
  plant_id: string;
  genus_id: string;
  image_id?: string | null;
  leaf_index?: number | null;
  side_of_the_world_id?: string | null;
  location_on_plant_id?: string | null;
};

export type LeafSaveResponse = {
  leaves: {
    client_leaf_id?: string | null;
    leaf_id: string;
  }[];
};

export const leavesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveLeaves: builder.mutation<LeafSaveResponse, LeafSaveItem[]>({
      query: (leaves) => ({
        url: "/leaves/save",
        method: "PUT",
        body: { leaves },
      }),
      invalidatesTags: ["Leaves", "Plants"],
    }),
  }),
});

export const { useSaveLeavesMutation } = leavesApi;
