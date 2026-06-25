import { useState } from "react";
import type { ILeafData } from "../components/LeavesContainer";

export const useLeavesState = () => {
  const [leaves, setLeaves] = useState<ILeafData[]>([]);

  const handleAddLeaves = (newLeaves: ILeafData[]) => {
    setLeaves((prev) => [...prev, ...newLeaves]);
  };
  const handleDeleteLeaves = (leaf_id: string) => {
    setLeaves(leaves.filter((item) => item.leaf_id !== leaf_id));
  };

  return {
    leaves,
    handleAddLeaves,
    handleDeleteLeaves,
  };
};
