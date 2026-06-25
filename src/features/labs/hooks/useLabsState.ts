import { useEntityCRUD } from "@/shared/hooks/useEntityCRUD";
import type { ILabDataFull } from "@/shared/types/lab";
import {
  useCreateLabMutation,
  useDeleteLabMutation,
  useEditLabMutation,
  useLazyGetLabByIdQuery,
  useGetLabsQuery,
} from "@/api/endpoints";

export const useLabsCrud = () => {
  const crud = useEntityCRUD<ILabDataFull>(
    useGetLabsQuery,
    useLazyGetLabByIdQuery,
    useCreateLabMutation,
    useEditLabMutation,
    useDeleteLabMutation,
    undefined,
  );

  return { ...crud };
};
