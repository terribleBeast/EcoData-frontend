import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { IGenus } from "@/shared/types";
import {
  useGetGeneraQuery,
  useLazyGetAvailableSpeciesByGenusQuery,
} from "@/api/endpoints";
import {
  selectGenus,
  selectSpecies,
  setGenus,
  setSpecies,
} from "../analyzerSlice";

type GenusLike = IGenus & {
  id?: string;
  genus_id?: string;
};

const getGenusId = (genus: GenusLike | null | undefined) => {
  return genus?.id ?? genus?.genus_id;
};

export const useClassifiers = () => {
  const dispatch = useDispatch();

  const selectedGenus = useSelector(selectGenus);
  const classifiers = useSelector(selectSpecies);

  const generaQuery = useGetGeneraQuery();

  const [getAvailableSpeciesByGenus, availableSpeciesQuery] =
    useLazyGetAvailableSpeciesByGenusQuery();

  const handleSelectGenera = useCallback(
    async (genus: GenusLike | null) => {
      console.log("SELECTED GENUS:", genus);

      const genusId = getGenusId(genus);

      if (!genusId) {
        dispatch(setGenus(undefined));
        dispatch(setSpecies([]));
        return;
      }

      dispatch(setGenus(genus as IGenus));
      dispatch(setSpecies([]));

      try {
        console.log("REQUEST AVAILABLE SPECIES:", genusId);

        const species = await getAvailableSpeciesByGenus(genusId).unwrap();

        console.log("AVAILABLE SPECIES RESPONSE:", species);

        dispatch(setSpecies(species));
      } catch (error) {
        console.error("Failed to load available species:", error);
        dispatch(setSpecies([]));
      }
    },
    [dispatch, getAvailableSpeciesByGenus],
  );

  return {
    selectedGenus,
    classifiers,
    generaQuery,
    availableSpeciesQuery,
    handleSelectGenera,
  };
};
