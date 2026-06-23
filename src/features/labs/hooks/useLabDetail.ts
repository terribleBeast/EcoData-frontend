import { useGetLabByIdQuery } from "@/api/endpoints";

export const useLabDetail = (id: number) => {
  const labQuery = useGetLabByIdQuery(id, { skip: id === -1 });

  return { labQuery };
};
