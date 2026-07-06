import { Dialog } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

import { useAnalyzerPage } from "../hooks/useAnalyzerPage";
import {
  ImageFullInfo,
  ImagesContainer,
  ClassifiersChapter,
} from "../components";
import { PageChapter } from "@/shared/ui/layout/PageChapter";
import { AnalyzerHeader } from "./AnalyzerHeader";
import { useClassifiers } from "../hooks/useClassifiers";
import { selectImages, selectImagesCount } from "../analyzerSlice";
import { LeavesContainer, type ILeafData } from "../components/LeavesContainer";
import LeafFullInfo from "../components/LeafFullInfo";
import { LeavesHeader } from "./LeavesHeader";
import { useGetPlantsQuery, useGetResearchesQuery } from "@/api/endpoints";
import { useSaveLeavesMutation } from "@/api/endpoints/leaves";

const normalize = (value?: string | null) => value?.trim().toLowerCase() ?? "";

const getLeafId = (leaf: ILeafData): string | undefined => {
  return ((leaf as any).leaf_id ?? (leaf as any).id)?.toString();
};

const getLeafPlantId = (leaf: ILeafData): string | undefined => {
  return ((leaf as any).plant_id ?? (leaf as any).plantId)?.toString();
};

const getPlantId = (plant: any): string | undefined => {
  return (plant?.plant_id ?? plant?.id)?.toString();
};

const getPlantSpeciesNames = (plant: any): string[] => {
  const species = plant?.plant_description?.species;

  return [species?.latin_name, species?.russian_name, species?.name].filter(
    Boolean,
  );
};

const AnalyzerPage = () => {
  const images = useSelector(selectImages);
  const imagesCount = useSelector(selectImagesCount);

  const [leafPlantDrafts, setLeafPlantDrafts] = useState<
    Record<string, string>
  >({});

  const [savedLeafPlantIds, setSavedLeafPlantIds] = useState<
    Record<string, string>
  >({});

  const researchesQuery = useGetResearchesQuery();
  const plantsQuery = useGetPlantsQuery();
  const [saveLeaves, saveLeavesState] = useSaveLeavesMutation();

  const { selectedGenus, classifiers, generaQuery, handleSelectGenera } =
    useClassifiers();

  const {
    selectedImage,
    addImages,
    deleteImage,
    updateImageStatus,
    openImageFullInfo,
    closeImageFullInfo,
    handleProcessImages,
    handleDeleteLeaves,
    leaves,
    closeLeafFullInfo,
    openLeafFullInfo,
    selectedLeaf,
  } = useAnalyzerPage();

  const findPredictedPlantIdForLeaf = (leaf: ILeafData): string | undefined => {
    const predictedClassifier = leaf.bestPrediction?.classifier;

    const predictedPlant = (plantsQuery.data ?? []).find((plant) =>
      getPlantSpeciesNames(plant).some(
        (name) => normalize(name) === normalize(predictedClassifier),
      ),
    );

    return predictedPlant ? getPlantId(predictedPlant) : undefined;
  };

  const getSelectedPlantIdForLeaf = (leaf: ILeafData): string | undefined => {
    const leafId = getLeafId(leaf);

    if (!leafId) {
      return undefined;
    }

    return (
      leafPlantDrafts[leafId] ??
      getLeafPlantId(leaf) ??
      savedLeafPlantIds[leafId] ??
      findPredictedPlantIdForLeaf(leaf)
    );
  };

  const handleChangeLeafPlantDraft = (leafId: string, plantId: string) => {
    setLeafPlantDrafts((prev) => ({
      ...prev,
      [leafId]: plantId,
    }));
  };

  const hasUnsavedLeafAssignments = leaves.some((leaf) => {
    const leafId = getLeafId(leaf);

    if (!leafId) {
      return false;
    }

    const currentPlantId = getLeafPlantId(leaf) ?? savedLeafPlantIds[leafId];
    const selectedPlantId = getSelectedPlantIdForLeaf(leaf);

    return Boolean(selectedPlantId && selectedPlantId !== currentPlantId);
  });

  const handleSaveLeaves = async () => {
    if (!selectedGenus?.id) {
      console.error("Cannot save leaves: selected genus is missing");
      return;
    }

    const payload = leaves.flatMap((leaf, index) => {
      const localLeafId = getLeafId(leaf);

      if (!localLeafId) {
        console.error("Leaf has no local id:", leaf);
        return [];
      }

      const selectedPlantId = getSelectedPlantIdForLeaf(leaf);

      if (!selectedPlantId) {
        console.error("Leaf has no selected plant:", leaf);
        return [];
      }

      return [
        {
          client_leaf_id: localLeafId,
          leaf_id: localLeafId,
          plant_id: selectedPlantId,
          genus_id: selectedGenus.id,
          image_id: null,
          leaf_index: (leaf as any).leaf_index ?? index + 1,
          side_of_the_world_id: (leaf as any).side_of_the_world_id ?? null,
          location_on_plant_id: (leaf as any).location_on_plant_id ?? null,
        },
      ];
    });

    console.log("Save leaves payload:", payload);

    if (!payload.length) {
      return;
    }

    const response = await saveLeaves(payload).unwrap();

    const savedPlantIdsByLeafId = payload.reduce<Record<string, string>>(
      (acc, item) => {
        acc[item.client_leaf_id] = item.plant_id;
        return acc;
      },
      {},
    );

    setSavedLeafPlantIds((prev) => ({
      ...prev,
      ...savedPlantIdsByLeafId,
    }));

    setLeafPlantDrafts({});

    console.log("Saved leaves response:", response);
  };

  const handleAddToResearch = (research: {
    id?: string;
    research_id?: string;
    title: string;
  }) => {
    const researchId = research.id ?? research.research_id;

    if (!researchId) {
      return;
    }

    console.log("Selected research:", researchId);
  };

  const selectedLeafId = selectedLeaf ? getLeafId(selectedLeaf) : undefined;

  return (
    <>
      {selectedImage && (
        <Dialog open onClose={closeImageFullInfo} fullWidth maxWidth="xl">
          <ImageFullInfo image={selectedImage} leaves={leaves} />
        </Dialog>
      )}

      {selectedLeaf && (
        <Dialog open onClose={closeLeafFullInfo} fullWidth maxWidth="xl">
          <LeafFullInfo
            leaf={{
              ...selectedLeaf,
              plantId: selectedLeafId
                ? (savedLeafPlantIds[selectedLeafId] ??
                  getLeafPlantId(selectedLeaf))
                : getLeafPlantId(selectedLeaf),
              draftPlantId: selectedLeafId
                ? leafPlantDrafts[selectedLeafId]
                : undefined,
            }}
            plants={plantsQuery.data ?? []}
            leafGenusId={selectedGenus?.id ?? ""}
            onChangePlantDraft={handleChangeLeafPlantDraft}
          />
        </Dialog>
      )}

      <ClassifiersChapter
        selectedGenus={selectedGenus}
        classifiers={classifiers}
        generaQuery={generaQuery}
        handleSelectGenera={handleSelectGenera}
      />

      <PageChapter
        header={{
          component: (
            <AnalyzerHeader
              imagesCount={imagesCount}
              settedGenus={selectedGenus !== undefined}
              handleProcessImages={handleProcessImages}
              researches={researchesQuery.data ?? []}
              isResearchesLoading={researchesQuery.isLoading}
              canAddToResearch={imagesCount.success > 0}
              handleAddToResearch={handleAddToResearch}
            />
          ),
        }}
        sx={{
          maxHeight: "600px",
        }}
      >
        <ImagesContainer
          addImages={addImages}
          images={images}
          settedGenus={selectedGenus !== undefined}
          onOpen={openImageFullInfo}
          onDelete={deleteImage}
          onUpdate={updateImageStatus}
          leaves={leaves}
        />
      </PageChapter>

      <PageChapter
        header={{
          component: (
            <LeavesHeader
              leavesCount={leaves.length}
              onSave={handleSaveLeaves}
              isSaving={saveLeavesState.isLoading}
              hasUnsavedChanges={hasUnsavedLeafAssignments}
            />
          ),
        }}
      >
        <LeavesContainer
          leaves={leaves}
          onOpen={openLeafFullInfo}
          onDelete={handleDeleteLeaves}
        />
      </PageChapter>
    </>
  );
};

export default AnalyzerPage;
