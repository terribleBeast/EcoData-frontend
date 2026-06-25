import {
  type LoginRequest,
  type RegisterRequest,
  type ResearcherProfileResponse,
  type TokenResponse,
} from "@/shared/types/user";
import { apiSlice } from "../apiSlice";

export const userEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login → returns TokenResponse
    login: builder.mutation<TokenResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    // Register → returns the created researcher UUID
    register: builder.mutation<string, RegisterRequest>({
      query: (userData) => ({
        url: "/auth/register",
        body: {
          ...userData,
          system_role_id: "ee63a75e-c44e-4a6a-b371-10d361f3cf9f",
        },
        method: "POST",
      }),
    }),
    // Get current researcher profile
    getMe: builder.query<ResearcherProfileResponse, void>({
      query: () => "/auth/me",
    }),
  }),
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
} = userEndpoints;
