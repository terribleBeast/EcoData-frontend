import React, { useEffect } from "react";
import { Paper, Box, Typography } from "@mui/material";
import {
  TableCell,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Card,
  Button,
  CardHeader,
  CardContent,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { DialogPanel } from "../../DialogPanel";

export const imageStatus = {
  LOADING: "Загрузка",
  UPLOADED: "Загружен",
  PROCESSING: "В обработке",
  PROCESSED: "Обработан",
  ERROR: "Ошибка",
  UNKNOWN: "Неизвестно",
};

export const ImageCard = ({
  image,
  onDelete: handleDelete,
  onOpen: handleOpenImageFullInfo,
}) => {
  console.log("ImageCard");
  let borderStyle = "0 0 4px";
  switch (image.status) {
    case imageStatus.LOADING:
      borderStyle = borderStyle.concat(" #3C9DD0");
      // TODO: add loading stage
      image.status = imageStatus.UPLOADED;
      break;
    case imageStatus.UPLOADED:
      borderStyle = borderStyle.concat(" yellow");
      break;
    case imageStatus.PROCESSING:
      borderStyle = borderStyle.concat(" blue");
      break;
    case imageStatus.PROCESSED:
      borderStyle = borderStyle.concat(" green");
      break;
    case imageStatus.ERROR:
      borderStyle = borderStyle.concat(" red");
      break;
    default:
      // imageStatus.UNKNOWN
      borderStyle = borderStyle.concat(" gray");
      break;
  }

  const prediction =
    image.predictions !== null && image.predictions !== undefined
      ? image.predictions.reduce((max, current) =>
          current.probability > max.probability ? current : max,
        )
      : null;
  return (
    <Paper
      key={image.key}
      style={{
        padding: "0.5rem",
        width: "150px",
        boxShadow: borderStyle,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={image.src !== undefined ? image.src : "no-image-icon_1200.png"}
          alt="ошибка загрузки изображения"
          width="100px"
          height="100px"
          style={{
            border: "1px solid black",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => handleOpenImageFullInfo(image)}
        ></img>
      </Box>

      <Box className="image-overlay">
        <Typography
          className="image-title"
          style={{ overflowWrap: "break-word", fontWeight: "bold" }}
        >
          {image.name !== undefined ? image.name : "Не найдено"}
        </Typography>
        <Typography className="image-prediction">
          {prediction !== null ? prediction.classifier : "Нет предсказаний"}
        </Typography>
      </Box>
      <Box style={{ display: "flex", justifyContent: "end" }}>
        <Delete
          style={{
            color: "red",
            fontSize: "medium",
            cursor: "pointer",
          }}
          onClick={() => handleDelete(image)}
        />
      </Box>
    </Paper>
  );
};

export const ImageFullInfo = ({ image }) => {
  console.log("image FULL");

  // TODO: implement handle keydown
  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     // if (event.ctrlKey && event.key === Key.K) {
  //     //   event.preventDefault(); // Prevent default browser behavior
  //     // }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);
  const columns = [
    {
      Header: "Классификатор",
      accessor: "classifier",
    },
    {
      Header: "Вероятность",
      accessor: "probability",
    },
  ];
  const bestValue =
    image.predictions !== null && image.predictions !== undefined
      ? image.predictions.reduce((max, current) =>
          current.probability > max.probability ? current : max,
        )
      : null;

  return (
    <DialogPanel>
      <Paper
        elevation={3}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
        }}
      >
        <Typography
          className="chapter-title"
          style={{ height: "5%", alignSelf: "center" }}
        >
          Изображение
        </Typography>

        <img
          src={image.src !== undefined ? image.src : "no-image-icon_1200.png"}
          alt={image.src}
          width="100%"
        />
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
          }}
        >
          <Button variant="contained" color="success">
            Лупа
          </Button>
          <Button
            href={image.src}
            target="_blank"
            variant="contained"
            color="success"
          >
            Открыть в новой вкладке
          </Button>
          <Button variant="contained" color="success">
            Линейка
          </Button>
        </Box>
      </Paper>
      <Paper
        elevation={3}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
        }}
      >
        <Typography
          className="chapter-title"
          // variant="h6"
          // component="h2"
          gutterBottom
          style={{ height: "10%", alignSelf: "center" }}
        >
          Информация об изображении
        </Typography>

        <Box style={{ height: "90%" }}>
          <Card elevation={2} style={{ marginBottom: "16px" }}>
            <CardHeader title="Общая информация" />
            <CardContent>
              <Typography style={{ fontWeight: "bold" }}>
                Имя:{" "}
                <Typography style={{ display: "inline" }}>
                  {image.name !== undefined ? image.name : "Не найдено"}
                </Typography>
              </Typography>
              <Typography style={{ fontWeight: "bold" }}>
                Статус:{" "}
                <Typography style={{ display: "inline" }}>
                  {image.status}
                </Typography>
              </Typography>
            </CardContent>
          </Card>
          <Card elevation={2} style={{ marginBottom: "16px" }}>
            <CardHeader title="Результаты анализа" />
            <CardContent>
              <Typography style={{ fontWeight: "bold" }} gutterBottom>
                Выбранный классификатор:{" "}
                <Typography style={{ display: "inline" }}>
                  {image.selectedClassifier}
                </Typography>
              </Typography>
              {image.predictions !== null && image.predictions !== undefined ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      {columns.map((column, index) => (
                        <TableCell key={index}>{column.Header}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {image.predictions.map((prediction, index) => (
                      <TableRow
                        key={index}
                        style={{
                          backgroundColor:
                            prediction.probability === bestValue.probability
                              ? "lightgreen"
                              : "",
                        }}
                      >
                        <TableCell>{prediction.classifier}</TableCell>
                        <TableCell>
                          {prediction.probability.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Typography>Нет предсказаний</Typography>
              )}
            </CardContent>
          </Card>
        </Box>
      </Paper>
    </DialogPanel>
  );
};
