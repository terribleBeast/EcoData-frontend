// frontend/src/features/researchers/hooks/useResearchersState.ts

import {
  useCreateResearcherMutation,
  useDeleteResearcherMutation,
  useGetResearchersQuery,
  useLazyGetResearcherByIdQuery,
  useUpdateResearcherMutation,
} from "@/api/endpoints";
import { type EntityCRUD, useEntityCRUD } from "@/shared/hooks/useEntityCRUD";
import type {
  IResearcherDataFull,
  ResearcherCreate,
} from "@/shared/types/researcher";

export const useResearchersCrud = () => {
  const crud = useEntityCRUD(
    useGetResearchersQuery as never,
    useLazyGetResearcherByIdQuery,
    useCreateResearcherMutation,
    useUpdateResearcherMutation,
    useDeleteResearcherMutation,
    undefined,
  ) as unknown as EntityCRUD<
    IResearcherDataFull,
    ResearcherCreate,
    Partial<ResearcherCreate> & { entity_id: string }
  >;

  return { ...crud };
};
