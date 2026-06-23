import {
  type IAuthUser,
  type ICheckExistUser,
  type ICreateUser,
} from "@/shared/types/user";
import { apiSlice } from "../apiSlice";

export const userEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    login: builder.mutation<IAuthUser, ICheckExistUser>({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: { data: IAuthUser }) => response.data,
    }),
    // Register
    createResearcher: builder.mutation<IAuthUser, ICreateUser>({
      query: (userData) => ({
        url: `/user/register`,
        body: userData,
        method: "POST",
      }),
    }),
  }),
});
export const { useLoginMutation, useCreateResearcherMutation } = userEndpoints;
