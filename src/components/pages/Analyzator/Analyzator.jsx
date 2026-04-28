import { Box, Button, Dialog, Paper, Typography } from "@mui/material";

import { useState } from "react";
import { getPrediction } from "../../../api/api.js";
import { getMockImages } from "../../../mock_data.js";
import FileDragAndDrop from "./DND";
import { ImageCard, ImageFullInfo, imageStatus } from "./Image.jsx";
import { ChapterHeaderTemplate, PageChapter } from "../../Templates.jsx";
import { classifiers } from "../../../entities.js";
import { ClassifiersChapter, DropDownGenusMenu } from "./components";

const ImagesContainer = ({
  images,
  onOpen: handleOpenImageFullInfo,
  onDelete: handleDeleteImage,
}) => (
  <Box
    className="cards-container"
    style={{
      maxHeight: "900px",
      overflowY: "auto",
    }}
  >
    {images.map((image, index) => (
      <ImageCard
        onOpen={(image) => handleOpenImageFullInfo(image)}
        onDelete={handleDeleteImage}
        image={image}
        key={index}
      />
    ))}
  </Box>
);

const ClassifiersMenu = ({ handleSelectClassifier }) => {
  return (
    <Paper
      className="chapter"
      style={{
        width: "100%",
        display: "flex",
        // justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <Typography className="chapter-title" style={{ fontSize: "32px" }}>
        Род
      </Typography>
      <DropDownGenusMenu handleSelectClassifier={handleSelectClassifier} />
    </Paper>
  );
};

function getAllPrediction(images) {
  // TODO: implement function creating csv file
}

const Analyzer = () => {
  const [isOpenFileMenu, setIsOpenFileMenu] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState(getMockImages(imageStatus.LOADING, 0));
  const [selectedClassifier, setSelectedClassifier] = useState("Яблоня");
  const handleSelectClassifier = (classifier_index) => {
    setSelectedClassifier(classifiers[classifier_index].plant);
  };

  const handleAddImages = (newImages) => {
    setImages((images) => [...newImages, ...images]);
  };

  const handleDeleteImage = (image) => {
    setImages(images.filter((tmp_image) => tmp_image.key !== image.key));
  };

  const handleOpenImageFullInfo = (image) => {
    setSelectedImage(image);
  };

  const handleDownloadResult = (e) => {
    e.preventDefault();

    if (!images || images.length === 0) {
      console.warn("No images to export");
      return;
    }

    // Get all unique species
    const allSpecies = new Set();
    images.forEach((image) => {
      if (image.predictions) {
        image.predictions.forEach((pred) => allSpecies.add(pred.classifier));
      }
    });
    const species = Array.from(allSpecies);

    // Prepare CSV data
    //
    const data = [["Id", "Изображение", "Род", ...species].join(",")];

    images.map((image, index) => {
      let row = [index + 1, image.name || "Unknown", image.selectedClassifier];

      species.forEach((speciesName) => {
        const prediction = image.predictions?.find(
          (p) => p.classifier === speciesName,
        );
        row.push(prediction ? prediction.probability : "");
      });

      data.push(row.join(","));
    });

    const type = "data:text/csv;charset=UTF-8";
    const blob = new Blob([data.join("\n")], { type: type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "result.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleProcessImages = async (images) => {
    for (let i = 0; i < images.length; i++) {
      if (images[i].status === imageStatus.UPLOADED) {
        images[i].predictions = await getPrediction(images[i]).then(
          (data) => data,
        );
        images[i].status = imageStatus.PROCESSED;
      }

      setImages([...images]);
    }

    return images;
  };

  return (
    <>
      <Dialog
        open={selectedImage !== null}
        onClose={() => {
          setSelectedImage(null);
        }}
        fullWidth={true}
        maxWidth="xl"
      >
        {selectedImage !== null && <ImageFullInfo image={selectedImage} />}
      </Dialog>
      <ClassifiersChapter />

      <PageChapter
        headerComponent={
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ChapterHeaderTemplate chapterTitle={"Изображения"} />
            <Box style={{ display: "flex", gap: "1rem" }}>
              <Button
                color="success"
                variant="contained"
                onClick={() => setIsOpenFileMenu(!isOpenFileMenu)}
              >
                <Typography>
                  {isOpenFileMenu ? "Закрыть" : "Добавить"}
                </Typography>
              </Button>
              <Button
                color="success"
                variant="contained"
                onClick={() => handleProcessImages(images)}
              >
                <Typography>Обработать</Typography>
              </Button>
              <Button
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
        {isOpenFileMenu && (
          <Box style={{ display: "flex" }}>
            <Box style={{ width: "80%" }}>
              <FileDragAndDrop
                updateImages={handleAddImages}
                defaultState={imageStatus.LOADING}
                selectedClassifier={selectedClassifier}
              />
            </Box>
            <Box style={{ display: "flex", width: "20%" }}>
              <ClassifiersMenu
                handleSelectClassifier={handleSelectClassifier}
              />
            </Box>
          </Box>
        )}
        <ImagesContainer
          images={images}
          onOpen={handleOpenImageFullInfo}
          onDelete={handleDeleteImage}
        />
      </PageChapter>
    </>
  );
};

export default Analyzer;
