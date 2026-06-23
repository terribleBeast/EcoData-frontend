import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Paper, Typography } from "@mui/material";

type Props = {
  getRootProps: () => object;
  getInputProps: () => object;
};

export const UploadTile = ({ getRootProps, getInputProps }: Props) => {
  return (
    <Paper
      {...getRootProps()}
      sx={{
        height: "250px",

        width: 150,
        // height: 320,
        border: "2px dashed",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />

      <AddPhotoAlternateIcon fontSize="large" />
      <Typography sx={{ textAlign: "center" }}>Добавить изображения</Typography>
    </Paper>
  );
};
