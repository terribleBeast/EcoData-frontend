import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { CrudState } from "./useEntityCRUD";
import type { SerializedError } from "@reduxjs/toolkit";

// ── State helpers ───────────────────────────────────────────────────────
export function combineState(parts: CrudState[]): CrudState {
  return {
    isLoading: parts.some((p) => p.isLoading),
    isError: parts.some((p) => p.isError),
    isSuccess: parts.some((p) => p.isSuccess),
    error: parts.find((p) => p.error)?.error,
  };
}

export function queryState(r: {
  isLoading?: boolean;
  isError?: boolean;
  error?: FetchBaseQueryError | SerializedError | undefined;
}): CrudState {
  return {
    isLoading: !!r.isLoading,
    isError: !!r.isError,
    isSuccess: false,
    error: r.error,
  };
}

export function mutationState(r: {
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  error?: FetchBaseQueryError | SerializedError | undefined;
}): CrudState {
  return {
    isLoading: !!r.isLoading,
    isError: !!r.isError,
    isSuccess: !!r.isSuccess,
    error: r.error,
  };
}
