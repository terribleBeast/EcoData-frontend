import { neuralModelEndpoints } from "@/api/endpoints";
import type { RootStateType } from "@/app/store";
import type { IGenus, ISpecies } from "@/shared/types";
import { ImageStatus, type IImageData } from "@/shared/types/image";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AnalyzerState {
  images: IImageData[];
  genus: IGenus | undefined;
  species: ISpecies[];
}

const initialState: AnalyzerState = {
  images: [],
  genus: undefined,
  species: [],
};

export const analyzerSlice = createSlice({
  name: "analyzer",
  initialState,
  reducers: {
    updateImages(state, { payload }: { payload: IImageData[] }) {
      state.images = payload;
      console.log(payload);
    },
    setGenus(state, { payload }: { payload: IGenus }) {
      state.genus = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      neuralModelEndpoints.endpoints.getClassifiers.matchFulfilled,
      (state, { payload }: PayloadAction<ISpecies[]>) => {
        console.log(payload);
        state.species = payload;
      },
    );
  },
});

export const selectGenus = (state: RootStateType) => state.analyzer.genus;
export const selectImages = (state: RootStateType) => state.analyzer.images;
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
