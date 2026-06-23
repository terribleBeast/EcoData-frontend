import { useEntityCRUD } from "@/shared/hooks/useEntityCRUD";
import {
  useCreateResearchMutation,
  useDeleteResearchMutation,
  useEditResearchMutation,
  useLazyGetResearchByIdQuery,
  useGetResearchesQuery,
} from "@/api/endpoints";

export const useResearchesCrud = () => {
  const crud = useEntityCRUD(
    useGetResearchesQuery,
    useLazyGetResearchByIdQuery,
    useCreateResearchMutation,
    useEditResearchMutation,
    useDeleteResearchMutation,
    undefined,
  );

  return { ...crud };
};
