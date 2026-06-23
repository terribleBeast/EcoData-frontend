import { Button, Chip, Stack, Box, Typography } from "@mui/material";

import { ChapterHeaderTemplate } from "@/shared/ui/ChapterHeader";
import { AvTimer, Check, Error } from "@mui/icons-material";

type Props = {
  imagesCount: {
    all: number;
    success: number;
    error: number;
    processing: number;
  };
  settedGenus: boolean;
  handleProcessImages: () => void;
  handleDownloadResult: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

const CountImageLabel = ({ name }: { name: string }) => (
  <Typography>{name}</Typography>
);

export const AnalyzerHeader = ({
  imagesCount,
  handleProcessImages,
  handleDownloadResult,
  settedGenus,
}: Props) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center ",
    }}
  >
    <Box>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
        <ChapterHeaderTemplate
          header={{
            title: "Изображения",
          }}
        />

        <Chip
          label={imagesCount.all}
          size="small"
          color="success"
          variant="outlined"
        />
      </Stack>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
        <Box>
          <Chip
            avatar={<Check fontSize="small" />}
            label={
              <CountImageLabel name={`Обработано: ${imagesCount.success}`} />
            }
            size="medium"
            color="success"
            variant="outlined"
          />
          {/*<Typography>Обработано</Typography>*/}
        </Box>
        <Box>
          <Chip
            avatar={<AvTimer fontSize="small" />}
            label={
              <CountImageLabel name={`Ожидают: ${imagesCount.processing}`} />
            }
            size="medium"
            color="warning"
            variant="outlined"
          />
        </Box>
        <Chip
          avatar={<Error fontSize="small" />}
          label={<CountImageLabel name={`Ошибок: ${imagesCount.error}`} />}
          size="medium"
          color="error"
          variant="outlined"
        />
      </Stack>
    </Box>

    <Stack direction="row" spacing={2}>
      <Button
        color="success"
        variant="contained"
        disabled={!settedGenus}
        onClick={handleProcessImages}
      >
        Обработать
      </Button>

      <Button
        href=""
        color="success"
        variant="outlined"
        onClick={handleDownloadResult}
      >
        Выгрузить
      </Button>
    </Stack>
  </Box>
);
