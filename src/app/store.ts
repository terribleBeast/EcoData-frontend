import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/user/authSlice";
import { apiSlice } from "@/api/apiSlice";
import analyzerReducer from "@/features/analyzer/analyzerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    analyzer: analyzerReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
export type RootStateType = ReturnType<typeof store.getState>;
