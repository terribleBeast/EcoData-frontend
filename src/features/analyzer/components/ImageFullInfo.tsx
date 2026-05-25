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
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { DialogPanel } from "../../../shared/components/DialogPanel";
import { type IImageData, type IPrediction } from "../../../shared/types/image";
import type { MRT_ColumnDef } from "material-react-table";

const columns: MRT_ColumnDef<IPrediction>[] = [
  {
    header: "Классификатор",
  },
  {
    header: "Вероятность",
  },
];
export const ImageFullInfo = ({ image }: { image: IImageData }) => {
  console.log("image FULL");

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
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
        }}
      >
        <Typography
          sx={(theme) => ({
            fontSize: "2.2rem",
            marginBottom: "1.5rem",
            fontWeight: 600,
            color: theme.palette.secondary.main,
            height: "5%",
            alignSelf: "center",
          })}
        >
          Изображение
        </Typography>

        <img
          src={image.src !== undefined ? image.src : "no-image-icon_1200.png"}
          alt={image.src}
          width="100%"
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
          }}
        >
          <Button variant="contained" color="success">
            Лупа
          </Button>
          <Button
            href={image.src !== undefined ? image.src : ""}
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
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
        }}
      >
        <Typography
          gutterBottom
          sx={(theme) => ({
            fontSize: "2.2rem",
            marginBottom: "1.5rem",
            fontWeight: 600,
            color: theme.palette.secondary.main,
            height: "10%",
            alignSelf: "center",
          })}
        >
          Информация об изображении
        </Typography>

        <Box sx={{ height: "90%" }}>
          <Card elevation={2} sx={{ marginBottom: "16px" }}>
            <CardHeader title="Общая информация" />
            <CardContent>
              <Typography sx={{ fontWeight: "bold" }}>
                Имя:{" "}
                <Typography sx={{ display: "inline" }}>
                  {image.name !== undefined ? image.name : "Не найдено"}
                </Typography>
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Статус:{" "}
                <Typography sx={{ display: "inline" }}>
                  {image.status}
                </Typography>
              </Typography>
            </CardContent>
          </Card>
          <Card elevation={2} sx={{ marginBottom: "16px" }}>
            <CardHeader title="Результаты анализа" />
            <CardContent>
              <Typography sx={{ fontWeight: "bold" }} gutterBottom>
                Выбранный классификатор:{" "}
                <Typography sx={{ display: "inline" }}>
                  {image.classifier}
                </Typography>
              </Typography>
              {image.predictions !== null && image.predictions !== undefined ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      {columns.map((column, index) => (
                        <TableCell key={index}>{column.header}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {image.predictions.map((prediction, index) => (
                      <TableRow
                        key={index}
                        style={{
                          backgroundColor:
                            bestValue &&
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

export default ImageFullInfo;
