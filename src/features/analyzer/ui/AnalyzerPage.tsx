import { Dialog } from "@mui/material";
import { useAnalyzerPage } from "../hooks/useAnalyzerPage";
import {
  ImageFullInfo,
  ImagesContainer,
  ClassifiersChapter,
} from "../components";
import { PageChapter } from "@/shared/ui/layout/PageChapter";
import { AnalyzerHeader } from "./AnalyzerHeader";
import { useClassifiers } from "../hooks/useClassifiers";
import { useSelector } from "react-redux";
import { selectImages, selectImagesCount } from "../analyzerSlice";
import { LeavesContainer } from "../components/LeavesContainer";
import LeafFullInfo from "../components/LeafFullInfo";
import { LeavesHeader } from "./LeavesHeader";
import { useGetPlantsQuery, useGetResearchesQuery } from "@/api/endpoints";
import { useAssignLeavesToPlantsMutation } from "@/api/endpoints/leaves";
import { useState } from "react";

const AnalyzerPage = () => {
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
  const images = useSelector(selectImages);
  const [leafPlantDrafts, setLeafPlantDrafts] = useState<
    Record<string, string>
  >({});
  const [assignLeavesToPlants, assignState] = useAssignLeavesToPlantsMutation();
  const plantsQuery = useGetPlantsQuery();

  const handleChangeLeafPlantDraft = (leafId: string, plantId: string) => {
    setLeafPlantDrafts((prev) => ({
      ...prev,
      [leafId]: plantId,
    }));
  };

  const hasUnsavedLeafAssignments = leaves.some((leaf) => {
    const draftPlantId = leafPlantDrafts[leaf.leaf_id];

    return Boolean(draftPlantId && draftPlantId !== leaf.plantId);
  });

  const handleSaveLeaves = async () => {
    const assignments = leaves
      .filter((leaf) => {
        const draftPlantId = leafPlantDrafts[leaf.leaf_id];

        return Boolean(draftPlantId && draftPlantId !== leaf.plantId);
      })
      .map((leaf) => ({
        leaf_id: leaf.leaf_id,
        plant_id: leafPlantDrafts[leaf.leaf_id],
      }));

    if (!assignments.length) {
      return;
    }

    await assignLeavesToPlants(assignments).unwrap();

    setLeafPlantDrafts({});
  };
  const imagesCount = useSelector(selectImagesCount);
  const researchesQuery = useGetResearchesQuery();
  const handleAddToResearch = (research: {
    id?: string;
    research_id?: string;
    title: string;
  }) => {
    const researchId = research.id ?? research.research_id;

    if (!researchId) return;

    console.log("Selected research:", researchId);

    // Later: call mutation here.
    // Example:
    // addAnalyzerLeavesToResearch({
    //   researchId,
    //   leaves,
    // });
  };
  const { selectedGenus, classifiers, generaQuery, handleSelectGenera } =
    useClassifiers();

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
              draftPlantId: leafPlantDrafts[selectedLeaf.leaf_id],
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
        {/*{isProcessing && (
          <div>
            <div>Stage: {progress.stage}</div>
            {progress.model && <div>Model: {progress.model}</div>}
            {progress.progress && <div>Progress: {progress.progress}</div>}
          </div>
        )}*/}
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
              isSaving={assignState.isLoading}
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
