// frontend/src/shared/hooks/useEntityCRUD.ts

import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { mutationState, queryState } from "./utils";

// ── Types ────────────────────────────────────────────────────────────────

/**
 * Captures the shape of an RTK Query mutation hook returned by
 * `apiSlice.useXxxMutation()` without depending on internal RTKQ types.
 *
 * `TArg`    — the argument the trigger function accepts
 * `TResult` — the result type (usually void for mutations)
 */
type MutationHook<TArg, TResult = unknown> = () => readonly [
  (arg: TArg) => Promise<TResult>,
  {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error?: FetchBaseQueryError | SerializedError | undefined;
    reset?: () => void;
  },
];

/**
 * Captures the shape of an RTK Query query hook returned by
 * `apiSlice.useXxxQuery(arg)`.
 */
type QueryHook<TArg, TResult> = (arg: TArg) => {
  data?: TResult;
  isLoading: boolean;
  isError: boolean;
  error?: FetchBaseQueryError | SerializedError | undefined;
  // … other RTKQ fields are simply ignored
};

type LazyQueryHook<TArg, TResult> = () => [
  (arg: TArg) => void,
  {
    data?: TResult;
    isLoading: boolean;
    isError: boolean;
    error?: FetchBaseQueryError | SerializedError | undefined;
    // … other RTKQ fields are simply ignored
  },
  unknown,
];

/** Aggregated state across all CRUD operations */
export interface CrudState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error?: FetchBaseQueryError | SerializedError | undefined;
}

/** Minimal contract any entity must satisfy to participate in CRUD */
export interface EntityWithId {
  id: number;
}

/** Uniform CRUD API returned by the hook */
export interface EntityCRUD<
  TEntity extends EntityWithId,
  TCreateArg = TEntity,
> {
  items: TEntity[];
  get: (id: number) => void;
  create: (arg: TCreateArg) => Promise<unknown>;
  update: (arg: Partial<TEntity> & { id: number }) => Promise<unknown>;
  remove: (id: number) => unknown;

  queriesState: {
    list: CrudState;
    detail: CrudState;
  };
  mutationsState: {
    create: CrudState;
    delete: CrudState;
    update: CrudState;
  };
}

// ── Core hook ────────────────────────────────────────────────────────────

/**
 * Generic CRUD hook for any RTK Query-backed entity.
 *
 * Pass the list-query hook, the three mutation hooks, and the query argument,
 * and get back a uniform `{ items, create, update, remove, state }` API.
 *
 * @example
 * ```ts
 * const { items, create, update, remove, state } = useEntityCRUD(
 *   useGetResearchersQuery,
 *   useCreateResearcherFullMutation,
 *   useEditResearcherFullMutation,
 *   useDeleteResearcherMutation,
 *   undefined,
 * );
 * ```
 */
export function useEntityCRUD<
  TEntity extends EntityWithId,
  TQueryArg = void,
  TCreateArg = TEntity,
>(
  useListQuery: QueryHook<TQueryArg, TEntity[]>,
  useLazyGetQuery: LazyQueryHook<number, TEntity>,
  useCreateMutation: MutationHook<TCreateArg>,
  useUpdateMutation: MutationHook<Partial<TEntity> & { id: number }>,
  useDeleteMutation: MutationHook<number>,
  listQueryArg: TQueryArg,
): EntityCRUD<TEntity, TCreateArg> {
  const listResult = useListQuery(listQueryArg);

  const [get, getResult] = useLazyGetQuery();
  const [create, createResult] = useCreateMutation();
  const [update, updateResult] = useUpdateMutation();
  const [remove, deleteResult] = useDeleteMutation();

  return {
    items: listResult.data ?? [],

    get,
    create,
    update,
    remove,

    queriesState: {
      list: queryState(listResult),
      detail: queryState(getResult),
    },

    mutationsState: {
      create: mutationState(createResult),
      update: mutationState(updateResult),
      delete: mutationState(deleteResult),
    },
  };
}
