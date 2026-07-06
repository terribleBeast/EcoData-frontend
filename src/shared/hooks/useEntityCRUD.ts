// frontend/src/shared/hooks/useEntityCRUD.ts

import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { mutationState, queryState } from "./utils";

export type UUID = string;

// ── RTK Query compatible hook shapes ────────────────────────────────────────

type QueryState<TResult> = {
  data?: TResult;
  isLoading: boolean;
  isFetching?: boolean;
  isError: boolean;
  isSuccess?: boolean;
  error?: FetchBaseQueryError | SerializedError | undefined;
};

type MutationState = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error?: FetchBaseQueryError | SerializedError | undefined;
  reset?: () => void;
};

/**
 * Minimal shape of an RTK Query query hook.
 *
 * TArg is usually `void` for list queries, but can also be a filter/query object.
 */
type QueryHook<TArg, TResult> = (arg: TArg) => QueryState<TResult>;

/**
 * Minimal shape of an RTK Query lazy query hook.
 *
 * Detail queries in this project use UUID path parameters.
 */
type LazyQueryHook<TResult> = () => readonly [
  (id: UUID) => unknown,
  QueryState<TResult>,
  unknown?,
];

/**
 * Minimal shape of an RTK Query mutation hook.
 */
type MutationHook<TArg> = () => readonly [
  (arg: TArg) => unknown,
  MutationState,
];

// ── Public types ────────────────────────────────────────────────────────────

/** Aggregated state for one CRUD operation group. */
export interface CrudState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error?: FetchBaseQueryError | SerializedError | undefined;
}

/**
 * Minimal contract for entities used by `useEntityCRUD`.
 *
 * Backend IDs are UUID strings, not numbers.
 */
export interface EntityWithId {
  id: UUID;
}

/**
 * Standard update argument used by update endpoints.
 *
 * Most frontend endpoint files convert `entity_id` to the path parameter:
 * PATCH /entity/{entity_id}
 */
export type EntityUpdateArg<TCreateArg> = Partial<TCreateArg> & {
  entity_id: UUID;
};

/** Uniform CRUD API returned by the hook. */
export interface EntityCRUD<
  TEntity extends EntityWithId,
  TCreateArg = TEntity,
  TUpdateArg = EntityUpdateArg<TCreateArg>,
> {
  items: TEntity[];

  get: (id: UUID) => void;
  create: (arg: TCreateArg) => Promise<unknown>;
  update: (arg: TUpdateArg) => Promise<unknown>;
  remove: (id: UUID) => unknown;

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

// ── Core hook ───────────────────────────────────────────────────────────────

/**
 * Generic CRUD hook for RTK Query backed entities.
 *
 * Important:
 * - entity IDs are UUID strings;
 * - update mutations receive `{ entity_id, ...body }`;
 * - `get` and `remove` receive only the UUID string.
 */
export function useEntityCRUD<
  TEntity extends EntityWithId,
  TQueryArg = void,
  TCreateArg = TEntity,
  TUpdateArg = EntityUpdateArg<TCreateArg>,
>(
  useListQuery: QueryHook<TQueryArg, TEntity[]>,
  useLazyGetQuery: LazyQueryHook<TEntity>,
  useCreateMutation: MutationHook<TCreateArg>,
  useUpdateMutation: MutationHook<TUpdateArg>,
  useDeleteMutation: MutationHook<UUID>,
  listQueryArg: TQueryArg,
): EntityCRUD<TEntity, TCreateArg, TUpdateArg> {
  const listResult = useListQuery(listQueryArg);
  const [getTrigger, getResult] = useLazyGetQuery();

  const [createTrigger, createResult] = useCreateMutation();
  const [updateTrigger, updateResult] = useUpdateMutation();
  const [deleteTrigger, deleteResult] = useDeleteMutation();

  const get = (id: UUID) => {
    getTrigger(id);
  };

  const create = async (arg: TCreateArg) => {
    return await Promise.resolve(createTrigger(arg));
  };

  const update = async (arg: TUpdateArg) => {
    return await Promise.resolve(updateTrigger(arg));
  };

  const remove = (id: UUID) => {
    return deleteTrigger(id);
  };

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
