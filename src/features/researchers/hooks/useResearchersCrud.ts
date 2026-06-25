// frontend/src/features/researchers/hooks/useResearchersState.ts

import { useEntityCRUD } from "@/shared/hooks/useEntityCRUD";
import {
  useCreateResearcherMutation,
  useDeleteResearcherMutation,
  useUpdateResearcherMutation,
  useLazyGetResearcherByIdQuery,
  useGetResearchersQuery,
} from "@/api/endpoints";

export const useResearchersCrud = () => {
  const crud = useEntityCRUD(
    useGetResearchersQuery,
    useLazyGetResearcherByIdQuery,
    useCreateResearcherMutation,
    useUpdateResearcherMutation,
    useDeleteResearcherMutation,
    undefined,
  );

  return { ...crud };
};
