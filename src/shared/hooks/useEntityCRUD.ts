// frontend/src/shared/hooks/useEntityCRUD.ts

import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { mutationState, queryState } from "./utils";

// ── Types ────────────────────────────────────────────────────────────────

/**
 * Captures the shape of an RTK Query mutation hook returned by
 * `apiSlice.useXxxMutation()` without depending on internal RTKQ types.
 */

// Then replace id: number / get(id: number) / remove(id: number)
// with EntityId in the rest of this file.

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
};

type LazyQueryHook<TArg, TResult> = () => [
  (arg: TArg) => void,
  {
    data?: TResult;
    isLoading: boolean;
    isError: boolean;
    error?: FetchBaseQueryError | SerializedError | undefined;
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

/** Any entity that represents a DB row must expose its PK via entity_id */
export type EntityId = string | number;

export interface EntityWithId {
  id: EntityId;
}
/** Uniform CRUD API returned by the hook */
export interface EntityCRUD<
  TEntity extends EntityWithId,
  TCreateArg = TEntity,
  TUpdateArg = Partial<TEntity> & { entity_id: string },
> {
  items: TEntity[];
  /** Lookup an entity by its entity_id */
  get: (entity_id: string) => void;
  create: (arg: TCreateArg) => Promise<unknown>;
  update: (arg: TUpdateArg) => Promise<unknown>;
  remove: (entity_id: string) => unknown;

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
 * @example
 * ```ts
 * const crud = useEntityCRUD<ILabDataFull>(
 *   useGetLabsQuery, useLazyGetLabByIdQuery,
 *   useCreateLabMutation, useEditLabMutation, useDeleteLabMutation,
 *   undefined,
 * );
 * // crud.items: ILabDataFull[] — each item has `id: string`
 *
 * const crud2 = useEntityCRUD<IResearcherDataFull>(
 *   useGetResearchersQuery, useLazyGetResearcherByIdQuery,
 *   useCreateResearcherMutation, useUpdateResearcherMutation,
 *   useDeleteResearcherMutation, undefined,
 * );
 * // crud2.items: IResearcherDataFull[] — each item has `researcher_id: string`
 * ```
 */
export function useEntityCRUD<
  TEntity extends EntityWithId,
  TQueryArg = void,
  TCreateArg = TEntity,
  TUpdateArg = Partial<TEntity> & { entity_id: string },
>(
  useListQuery: QueryHook<TQueryArg, TEntity[]>,
  useLazyGetQuery: LazyQueryHook<string, TEntity>,
  useCreateMutation: MutationHook<TCreateArg>,
  useUpdateMutation: MutationHook<TUpdateArg>,
  useDeleteMutation: MutationHook<string>,
  listQueryArg: TQueryArg,
): EntityCRUD<TEntity, TCreateArg, TUpdateArg> {
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
