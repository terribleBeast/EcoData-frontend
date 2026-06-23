import { useGetAddressByIdQuery } from "@/api/endpoints";

export const useAddressDetail = (id: number) => {
  const addressQuery = useGetAddressByIdQuery(id, { skip: id === -1 });

  return { addressQuery };
};
