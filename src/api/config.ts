import type { RootStateType } from "@/app/store";
import type { FetchBaseQueryArgs } from "@reduxjs/toolkit/query/react";

const port = 8000;
const apiVersion = "v1";
export const apiConfig: FetchBaseQueryArgs = {
  baseUrl: `http://localhost:${port}/api/${apiVersion}`,
  timeout: 30000,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootStateType).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
      return headers;
    }
  },
};
