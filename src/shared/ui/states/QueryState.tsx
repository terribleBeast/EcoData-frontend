import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { QueryErrorState } from "./ErrorState";
import { LoadingState } from "./LoadingState";

export const QueryState = (r: {
  isLoading?: boolean;
  isError?: boolean;
  error?: FetchBaseQueryError | SerializedError | undefined;
}) => {
  if (r.isError) {
    return <QueryErrorState />;
  }
  if (r.isLoading) {
    return <LoadingState />;
  }
};
