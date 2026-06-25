import { neuralModelEndpoints } from "@/api/endpoints";
import type { RootStateType } from "@/app/store";
import type { IGenus, ISpecies } from "@/shared/types";
import {
  ImageStatus,
  type IImageData,
  type ImageStatusType,
} from "@/shared/types/image";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ILeafData } from "./components/LeavesContainer";

interface AnalyzerState {
  images: IImageData[];
  leavesImage: Map<number, ILeafData[]>;
  genus: IGenus | undefined;
  species: ISpecies[];
}

const initialState: AnalyzerState = {
  images: [],
  leavesImage: new Map(),
  genus: undefined,
  species: [],
};

export const analyzerSlice = createSlice({
  name: "analyzer",
  initialState,
  reducers: {
    updateImages(state, { payload }: { payload: IImageData[] }) {
      state.images = payload;
      const new_state = state.leavesImage;
      payload.map((item) => new_state.set(item.id, []));

      state.leavesImage = new_state;
    },
    setGenus(state, { payload }: { payload: IGenus }) {
      state.genus = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      neuralModelEndpoints.endpoints.getClassifiers.matchFulfilled,
      (state, { payload }: PayloadAction<ISpecies[]>) => {
        state.species = payload;
      },
    );
  },
});

export const selectGenus = (state: RootStateType) => state.analyzer.genus;
export const selectImages = (state: RootStateType) => state.analyzer.images;
export const selectLeavesImage = (state: RootStateType) =>
  state.analyzer.leavesImage;
export const selectSpecies = (state: RootStateType) => state.analyzer.species;

export const selectImagesCount = (state: RootStateType) => {
  return state.analyzer.images.reduce(
    (acc, image) => {
      switch (image.status) {
        case ImageStatus.PROCESSED:
          acc.success++;
          break;

        case ImageStatus.ERROR:
          acc.error++;
          break;

        case ImageStatus.PROCESSING:
          acc.processing++;
          break;
      }

      return acc;
    },
    {
      all: state.analyzer.images.length,
      success: 0,
      error: 0,
      processing: 0,
    },
  );
};
export const { updateImages, setGenus } = analyzerSlice.actions;
export default analyzerSlice.reducer;
