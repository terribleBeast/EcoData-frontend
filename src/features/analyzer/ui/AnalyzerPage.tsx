import { Box, Button, Dialog, Typography } from "@mui/material";
import { useAnalyzerPage } from "../hooks/useAnalyzerPage";
import { exportImagesToCsv } from "../utils";
import { ImageStatus } from "@/shared/types/image";
import { ChapterHeaderTemplate, PageChapter } from "@/shared/components";
import {
  FileDragAndDrop,
  ImageFullInfo,
  ImagesContainer,
  ClassifiersChapter,
  ClassifierMenu,
} from "../components";

const AnalyzerPage = () => {
  const {
    images,
    isFileMenuOpen,
    selectedImage,
    selectedClassifier,
    addImages,
    deleteImage,
    updateImageStatus,
    handleSelectClassifier,
    toggleFileMenu,
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

      <ClassifiersChapter />

      <PageChapter
        title={undefined}
        headerComponent={
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ChapterHeaderTemplate chapterTitle="Изображения" />
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Button
                color="success"
                variant="contained"
                onClick={toggleFileMenu}
              >
                <Typography>
                  {isFileMenuOpen ? "Закрыть" : "Добавить"}
                </Typography>
              </Button>
              <Button
                color="success"
                variant="contained"
                onClick={handleProcessImages}
              >
                <Typography>Обработать</Typography>
              </Button>
              <Button
                href=""
                color="success"
                variant="contained"
                onClick={handleDownloadResult}
              >
                <Typography>Выгрузить</Typography>
              </Button>
            </Box>
          </Box>
        }
      >
        {isFileMenuOpen && (
          <Box sx={{ display: "flex" }}>
            <Box sx={{ width: "80%" }}>
              <FileDragAndDrop
                onImagesAdded={addImages}
                defaultStatus={ImageStatus.LOADING}
                selectedClassifier={selectedClassifier}
              />
            </Box>
            <Box sx={{ display: "flex", width: "20%" }}>
              <ClassifierMenu onSelect={handleSelectClassifier} />
            </Box>
          </Box>
        )}
        <ImagesContainer
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
