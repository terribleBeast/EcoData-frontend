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
import { selectGenus, selectImages, selectImagesCount } from "../analyzerSlice";

const AnalyzerPage = () => {
  const classifiersState = useClassifiers();
  const images = useSelector(selectImages);
  const selectedGenus = useSelector(selectGenus);
  const imagesCount = useSelector(selectImagesCount);

  const {
    selectedImage,
    addImages,
    deleteImage,
    updateImageStatus,
    openImageFullInfo,
    closeImageFullInfo,
    handleProcessImages,
  } = useAnalyzerPage();
  const handleDownloadResult = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    exportImagesToCsv(images);
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
        generaQuery={classifiersState.generaQuery}
        classifiers={classifiersState.classifiers}
        handleSelectGenera={classifiersState.handleSelectGenera}
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
      >
        <ImagesContainer
          addImages={addImages}
          images={images}
          onOpen={openImageFullInfo}
          onDelete={deleteImage}
          onUpdate={updateImageStatus}
        />
      </PageChapter>
    </>
  );
};

export default AnalyzerPage;
