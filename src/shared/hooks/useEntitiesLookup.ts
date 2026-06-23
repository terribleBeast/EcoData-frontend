import {
  useLazyGetResearchersByIdsQuery,
  useLazyGetResearchesByIdsQuery,
  useGetResearchersQuery,
  useGetResearchesQuery,
} from "@/api/endpoints";
import { combineState, queryState } from "./utils";

export const useGetEntitiesLookup = () => {
  const [getResearchersByIdsQuery, getResearchersByIdsQueryResult] =
    useLazyGetResearchersByIdsQuery();
  const [getResearchesByIdsQuery, getResearchesByIdsQueryResult] =
    useLazyGetResearchesByIdsQuery();
  const getResearchesQueryResult = useGetResearchesQuery();
  const getResearchersQueryResult = useGetResearchersQuery();

  const state = combineState([
    queryState(getResearchersByIdsQueryResult),
    queryState(getResearchesByIdsQueryResult),
    queryState(getResearchesQueryResult),
    queryState(getResearchersQueryResult),
  ]);

  return {
    researches: getResearchesQueryResult.data ?? [],
    researchers: getResearchersQueryResult.data ?? [],
    getResearchersByIdsQuery,
    getResearchesByIdsQuery,
    state,
  };
};
