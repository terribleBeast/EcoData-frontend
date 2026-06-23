import { useEntityCRUD } from "@/shared/hooks/useEntityCRUD";
import {
  useCreateAddressMutation,
  useDeleteAddressMutation,
  useEditAddressMutation,
  useLazyGetAddressByIdQuery,
  useGetAddressesQuery,
} from "@/api/endpoints";

export const useLocationsCrud = () => {
  const crud = useEntityCRUD(
    useGetAddressesQuery,
    useLazyGetAddressByIdQuery,
    useCreateAddressMutation,
    useEditAddressMutation,
    useDeleteAddressMutation,
    undefined,
  );

  return { ...crud };
};
