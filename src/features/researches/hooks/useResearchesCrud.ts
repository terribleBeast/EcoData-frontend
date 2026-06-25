import { useEntityCRUD } from "@/shared/hooks/useEntityCRUD";
import {
  useCreateResearchMutation,
  useDeleteResearchMutation,
  useUpdateResearchMutation,
  useLazyGetResearchByIdQuery,
  useGetResearchesQuery,
} from "@/api/endpoints";

export const useResearchesCrud = () => {
  const crud = useEntityCRUD(
    useGetResearchesQuery,
    useLazyGetResearchByIdQuery,
    useCreateResearchMutation,
    useUpdateResearchMutation,
    useDeleteResearchMutation,
    undefined,
  );

  return { ...crud };
};
