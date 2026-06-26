import { Button, Chip, Stack } from "@mui/material";
import { Spa } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import { ChapterHeaderTemplate } from "@/shared/ui/ChapterHeader";

type LeavesHeaderProps = {
  leavesCount: number;
  onSave: () => void;
  isSaving?: boolean;
  hasUnsavedChanges?: boolean;
};
export const LeavesHeader = ({
  leavesCount,
  onSave,
  isSaving = false,
  hasUnsavedChanges = false,
}: LeavesHeaderProps) => {
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
      <ChapterHeaderTemplate
        header={{
          title: "Листья",
        }}
      />

      <Chip
        label={leavesCount}
        size="small"
        color="success"
        variant="outlined"
      />

      <Button
        variant="contained"
        color="success"
        size="small"
        onClick={onSave}
        disabled={!hasUnsavedChanges || isSaving}
      >
        {isSaving ? "Сохранение..." : "Сохранить"}
      </Button>
    </Stack>
  );
};
