import {
  useCreateResearcherMutation,
  useDeleteResearcherMutation,
  useGetResearchersQuery,
  useLazyGetResearcherByIdQuery,
  useUpdateResearcherMutation,
} from "@/api/endpoints";
import { useEntityCRUD } from "@/shared/hooks/useEntityCRUD";

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
