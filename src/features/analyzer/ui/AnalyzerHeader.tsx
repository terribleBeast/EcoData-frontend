import { useState } from "react";
import {
  Button,
  Chip,
  Stack,
  Box,
  Typography,
  Menu,
  MenuItem,
  ListItemText,
  CircularProgress,
  alpha,
  Tooltip,
} from "@mui/material";

import { ChapterHeaderTemplate } from "@/shared/ui/ChapterHeader";
import { AvTimer, Check, Error, Add, FileUpload } from "@mui/icons-material";
import {
  ImageStatus,
  STATUS_BORDER_COLORS,
  type ImageStatusType,
} from "@/shared/types/image";

type ResearchOption = {
  id?: string;
  research_id?: string;
  title: string;
  status?: string;
};

type Props = {
  imagesCount: {
    all: number;
    uploaded: number;
    success: number;
    error: number;
    processing: number;
  };
  settedGenus: boolean;
  handleProcessImages: () => void;

  researches: ResearchOption[];
  isResearchesLoading?: boolean;
  canAddToResearch: boolean;
  handleAddToResearch: (research: ResearchOption) => void;
};

type StatusCounterChipProps = {
  label: string;
  count: number;
  status: ImageStatusType;
  icon: React.ReactElement;
};

const StatusCounterChip = ({
  label,
  count,
  status,
  icon,
}: StatusCounterChipProps) => {
  const color = STATUS_BORDER_COLORS[status];

  return (
    <Tooltip title={label}>
      <Chip
        icon={icon}
        label={`${label}: ${count}`}
        size="medium"
        variant="outlined"
        sx={{
          fontSize: "0.95rem",
          fontWeight: 600,
          color,
          borderColor: alpha(color, 0.5),
          backgroundColor: alpha(color, 0.1),

          "& .MuiChip-icon": {
            color,
          },
        }}
      />
    </Tooltip>
  );
};

export const AnalyzerHeader = ({
  imagesCount,
  handleProcessImages,
  settedGenus,
  researches,
  isResearchesLoading = false,
  canAddToResearch,
  handleAddToResearch,
}: Props) => {
  const [researchMenuAnchor, setResearchMenuAnchor] =
    useState<null | HTMLElement>(null);

  const isResearchMenuOpen = Boolean(researchMenuAnchor);

  const openResearchMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setResearchMenuAnchor(event.currentTarget);
  };

  const closeResearchMenu = () => {
    setResearchMenuAnchor(null);
  };

  const selectResearch = (research: ResearchOption) => {
    handleAddToResearch(research);
    closeResearchMenu();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
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
        <Stack
          direction="row"
          spacing={1.2}
          sx={{
            alignItems: "center",
            flexWrap: "wrap",
            rowGap: "0.6rem",
          }}
        >
          <StatusCounterChip
            icon={<FileUpload fontSize="small" />}
            label="Загружено"
            count={imagesCount.uploaded}
            status={ImageStatus.UPLOADED}
          />

          <StatusCounterChip
            icon={<AvTimer fontSize="small" />}
            label="В обработке"
            count={imagesCount.processing}
            status={ImageStatus.PROCESSING}
          />

          <StatusCounterChip
            icon={<Check fontSize="small" />}
            label="Обработано"
            count={imagesCount.success}
            status={ImageStatus.PROCESSED}
          />

          <StatusCounterChip
            icon={<Error fontSize="small" />}
            label="Ошибок"
            count={imagesCount.error}
            status={ImageStatus.ERROR}
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
          color="success"
          variant="outlined"
          startIcon={<Add />}
          disabled={!canAddToResearch || isResearchesLoading}
          onClick={openResearchMenu}
        >
          Добавить к исследованию
        </Button>

        <Menu
          anchorEl={researchMenuAnchor}
          open={isResearchMenuOpen}
          onClose={closeResearchMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {isResearchesLoading && (
            <MenuItem disabled>
              <CircularProgress size={18} sx={{ marginRight: "0.75rem" }} />
              Загрузка исследований...
            </MenuItem>
          )}

          {!isResearchesLoading && researches.length === 0 && (
            <MenuItem disabled>Исследования не найдены</MenuItem>
          )}

          {!isResearchesLoading &&
            researches.map((research) => {
              const researchId = research.id ?? research.research_id;

              return (
                <MenuItem
                  key={researchId}
                  onClick={() => selectResearch(research)}
                >
                  <ListItemText
                    primary={research.title}
                    secondary={research.status}
                  />
                </MenuItem>
              );
            })}
        </Menu>
      </Stack>
    </Box>
  );
};
