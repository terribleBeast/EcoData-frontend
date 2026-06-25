import { Dialog } from "@mui/material";
import { useAnalyzerPage } from "../hooks/useAnalyzerPage";
import { exportImagesToCsv } from "../utils";
import {
  ImageFullInfo,
  ImagesContainer,
  ClassifiersChapter,
} from "../components";
import { PageChapter } from "@/shared/ui/layout/PageChapter";
import { AnalyzerHeader } from "./AnalyzerHeader";
import { useClassifiers } from "../hooks/useClassifiers";
import { useSelector } from "react-redux";
import {
  markImagesProcessing,
  replaceProcessedImages,
  selectGenus,
  selectImages,
  selectImagesCount,
} from "../analyzerSlice";
import { LeavesContainer } from "../components/LeavesContainer";

const AnalyzerPage = () => {
  const images = useSelector(selectImages);

  const imagesCount = useSelector(selectImagesCount);
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
    handleAddLeaves,
    handleDeleteLeaves,
    leavesImage,
    isProcessing,
    progress,
  } = useAnalyzerPage();
  const handleDownloadResult = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // exportImagesToCsv(images);
  };

  return (
    <>
      <Dialog
        open={selectedImage !== null}
        onClose={closeImageFullInfo}
        fullWidth
        maxWidth="xl"
      >
        {selectedImage && <ImageFullInfo image={selectedImage} />}
      </Dialog>
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
              handleDownloadResult={handleDownloadResult}
              handleProcessImages={handleProcessImages}
              // isFileMenuOpen={isFileMenuOpen}
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
      <PageChapter header={{ title: "Листья" }}>
        <LeavesContainer
          images={images}
          leavesImage={leavesImage}
          addLeaves={handleAddLeaves}
          // onOpen={openImageFullInfo}
          onDelete={handleDeleteLeaves}
          // onUpdate={updateImageStatus}
        />
      </PageChapter>
    </>
  );
};

export default AnalyzerPage;
