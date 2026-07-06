import { useGetLabByIdQuery } from "@/api/endpoints";

export const useLabDetail = (id: string) => {
  const labQuery = useGetLabByIdQuery(id, { skip: id === "" });

  return { labQuery };
};
