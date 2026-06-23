import { useGetGeneraQuery, useLazyGetClassifiersQuery } from "@/api/endpoints";
import type { IGenus } from "@/shared/types";
import { useDispatch, useSelector } from "react-redux";
import { selectSpecies, setGenus } from "../analyzerSlice";

export const useClassifiers = () => {
  const generaQuery = useGetGeneraQuery();
  const dispatch = useDispatch();
  const classifiersSpecies = useSelector(selectSpecies);
  const [classifiersQuery, classifiersQueryResult] =
    useLazyGetClassifiersQuery();

  const handleSelectGenera = async (genus: IGenus) => {
    dispatch(setGenus(genus));
    await classifiersQuery(genus.id).unwrap();
  };
  return {
    generaQuery,
    handleSelectGenera,
    classifiersQueryResult,
    classifiers: classifiersSpecies,
    // classifiersQuery,
    // classifiersQueryResult,
  };
};
