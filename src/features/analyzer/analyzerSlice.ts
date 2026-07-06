import { neuralModelEndpoints } from "@/api/endpoints";
import type { RootStateType } from "@/app/store";
import type { IGenus, ISpecies } from "@/shared/types";
import {
  ImageStatus,
  type IImageData,
  type ImageStatusType,
  type IPrediction,
} from "@/shared/types/image";
import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { ILeafData } from "./components/LeavesContainer";

interface AnalyzerState {
  images: IImageData[];
  genus: IGenus | undefined;
  species: ISpecies[];
  leaves: ILeafData[];
}

type UpdateImageStatusPayload = {
  key: string;
  status: ImageStatusType;
};

type UpdateImagePredictionsPayload = {
  key: string;
  predictions: IPrediction[];
  status?: ImageStatusType;
};

const initialState: AnalyzerState = {
  images: [],
  genus: undefined,
  species: [],
  leaves: [],
};

export const analyzerSlice = createSlice({
  name: "analyzer",
  initialState,
  reducers: {
    setGenus(state, action: PayloadAction<IGenus | undefined>) {
      state.genus = action.payload;
    },

    clearGenus(state) {
      state.genus = undefined;
      state.species = [];
    },

    setSpecies(state, action: PayloadAction<ISpecies[]>) {
      state.species = action.payload;
    },

    updateImages(state, action: PayloadAction<IImageData[]>) {
      state.images = action.payload;
    },

    replaceImages(state, action: PayloadAction<IImageData[]>) {
      state.images = action.payload;
    },

    addImages(state, action: PayloadAction<IImageData[]>) {
      state.images.push(...action.payload);
    },

    deleteImage(state, action: PayloadAction<string>) {
      state.images = state.images.filter(
        (image) => image.key !== action.payload,
      );
    },

    deleteImages(state, action: PayloadAction<string[]>) {
      const keysToDelete = new Set(action.payload);
      state.images = state.images.filter(
        (image) => !keysToDelete.has(image.key),
      );
    },

    clearImages(state) {
      state.images = [];
    },

    updateImage(state, action: PayloadAction<IImageData>) {
      const index = state.images.findIndex(
        (image) => image.key === action.payload.key,
      );

      if (index !== -1) {
        state.images[index] = action.payload;
      }
    },

    updateImageStatus(state, action: PayloadAction<UpdateImageStatusPayload>) {
      const image = state.images.find(
        (item) => item.key === action.payload.key,
      );

      if (image) {
        image.status = action.payload.status;
      }
    },

    updateImagePredictions(
      state,
      action: PayloadAction<UpdateImagePredictionsPayload>,
    ) {
      const image = state.images.find(
        (item) => item.key === action.payload.key,
      );

      if (image) {
        image.predictions = action.payload.predictions;

        if (action.payload.status) {
          image.status = action.payload.status;
        }
      }
    },

    markImagesProcessing(state, action: PayloadAction<string[]>) {
      const keysToUpdate = new Set(action.payload);

      state.images = state.images.map((image) =>
        keysToUpdate.has(image.key)
          ? {
              ...image,
              status: ImageStatus.PROCESSING,
            }
          : image,
      );
    },

    replaceProcessedImages(state, action: PayloadAction<IImageData[]>) {
      const processedByKey = new Map(
        action.payload.map((image) => [image.key, image]),
      );

      state.images = state.images.map(
        (image) => processedByKey.get(image.key) ?? image,
      );
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      neuralModelEndpoints.endpoints.getAvailableSpeciesByGenus.matchFulfilled,
      (state, action: PayloadAction<ISpecies[]>) => {
        state.species = action.payload;
      },
    );
  },
});

export const {
  setGenus,
  clearGenus,
  setSpecies,
  updateImages,
  replaceImages,
  addImages,
  deleteImage,
  deleteImages,
  clearImages,
  updateImage,
  updateImageStatus,
  updateImagePredictions,
  markImagesProcessing,
  replaceProcessedImages,
} = analyzerSlice.actions;

export const selectGenus = (state: RootStateType) => state.analyzer.genus;

export const selectImages = (state: RootStateType) => state.analyzer.images;

export const selectSpecies = (state: RootStateType) => state.analyzer.species;

export const selectImagesCount = createSelector([selectImages], (images) => {
  return images.reduce(
    (acc, image) => {
      acc.all += 1;

      switch (image.status) {
        case ImageStatus.UPLOADED:
          acc.uploaded += 1;
          break;

        case ImageStatus.PROCESSING:
          acc.processing += 1;
          break;

        case ImageStatus.PROCESSED:
          acc.success += 1;
          break;

        case ImageStatus.ERROR:
          acc.error += 1;
          break;

        default:
          break;
      }

      return acc;
    },
    {
      all: 0,
      uploaded: 0,
      processing: 0,
      success: 0,
      error: 0,
    },
  );
});

export const selectUploadedImages = createSelector([selectImages], (images) =>
  images.filter((image) => image.status === ImageStatus.UPLOADED),
);

export const selectHasUploadedImages = createSelector(
  [selectUploadedImages],
  (images) => images.length > 0,
);

export const selectIsAnyImageProcessing = createSelector(
  [selectImages],
  (images) => images.some((image) => image.status === ImageStatus.PROCESSING),
);

export default analyzerSlice.reducer;
