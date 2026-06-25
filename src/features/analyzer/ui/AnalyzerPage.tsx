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
import { useGetResearchesQuery } from "@/api/endpoints";

const AnalyzerPage = () => {
  const images = useSelector(selectImages);

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
  const {
    selectedGenus,
    classifiers,
    generaQuery,
    availableSpeciesQuery,
    handleSelectGenera,
  } = useClassifiers();

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
    isProcessing,
    progress,
    closeLeafFullInfo,
    openLeafFullInfo,
    selectedLeaf,
  } = useAnalyzerPage();

  const handleDownloadResult = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // exportImagesToCsv(images);
  };

  return (
    <>
      {selectedImage && (
        <Dialog open onClose={closeImageFullInfo} fullWidth maxWidth="xl">
          <ImageFullInfo image={selectedImage} leaves={leaves} />
        </Dialog>
      )}

      {selectedLeaf && (
        <Dialog open onClose={closeLeafFullInfo} fullWidth maxWidth="xl">
          <LeafFullInfo leaf={selectedLeaf} />
        </Dialog>
      )}
      <ClassifiersChapter
        selectedGenus={selectedGenus}
        classifiers={classifiers}
        generaQuery={generaQuery}
        availableSpeciesQuery={availableSpeciesQuery}
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
        {isProcessing && (
          <div>
            <div>Stage: {progress.stage}</div>
            {progress.model && <div>Model: {progress.model}</div>}
            {progress.progress && <div>Progress: {progress.progress}</div>}
          </div>
        )}
        <ImagesContainer
          addImages={addImages}
          images={images}
          settedGenus={selectedGenus !== undefined}
          onOpen={openImageFullInfo}
          onDelete={deleteImage}
          onUpdate={updateImageStatus}
        />
      </PageChapter>
      <PageChapter
        header={{
          component: <LeavesHeader leavesCount={leaves.length} />,
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
