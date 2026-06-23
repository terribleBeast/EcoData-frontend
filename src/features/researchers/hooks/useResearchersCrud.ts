// frontend/src/features/researchers/hooks/useResearchersState.ts

import { useEntityCRUD } from "@/shared/hooks/useEntityCRUD";
import {
  useCreateResearcherFullMutation,
  useDeleteResearcherMutation,
  useEditResearcherFullMutation,
  useLazyGetResearcherByIdQuery,
  useGetResearchersQuery,
} from "@/api/endpoints";

export const useResearchersCrud = () => {
  const crud = useEntityCRUD(
    useGetResearchersQuery,
    useLazyGetResearcherByIdQuery,
    useCreateResearcherFullMutation,
    useEditResearcherFullMutation,
    useDeleteResearcherMutation,
    undefined,
  );

  return { ...crud };
};
