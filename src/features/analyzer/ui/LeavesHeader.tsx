import { Chip, Stack } from "@mui/material";
import { Spa } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import { ChapterHeaderTemplate } from "@/shared/ui/ChapterHeader";

type LeavesHeaderProps = {
  leavesCount: number;
};

export const LeavesHeader = ({ leavesCount }: LeavesHeaderProps) => {
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
      {/*<Chip
        icon={<Spa fontSize="small" />}
        label={`Всего: ${leavesCount}`}
        size="medium"
        variant="outlined"
        sx={(theme) => ({
          fontSize: "0.95rem",
          fontWeight: 600,
          color: theme.palette.secondary.main,
          borderColor: alpha(theme.palette.secondary.main, 0.45),
          backgroundColor: alpha(theme.palette.secondary.main, 0.08),

          "& .MuiChip-icon": {
            color: theme.palette.secondary.main,
          },
        })}
      />*/}
    </Stack>
  );
};
