import { useEntityCRUD } from "@/shared/hooks/useEntityCRUD";
import {
  useCreateLabMutation,
  useDeleteLabMutation,
  useEditLabMutation,
  useLazyGetLabByIdQuery,
  useGetLabsQuery,
} from "@/api/endpoints";

export const useLabsCrud = () => {
  const crud = useEntityCRUD(
    useGetLabsQuery,
    useLazyGetLabByIdQuery,
    useCreateLabMutation,
    useEditLabMutation,
    useDeleteLabMutation,
    undefined,
  );

  return { ...crud };
};
