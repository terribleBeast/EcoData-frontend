import {
  ImageStatus,
  STATUS_BORDER_COLORS,
  type ImageStatusType,
} from "@/shared/types/image";
import {
  Box,
  Chip,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
export interface InfoTableRow {
  label: string;
  value: React.ReactNode;
}

interface InfoTableProps {
  title: string;
  rows: InfoTableRow[];
}
export const StatusBadge = ({ status }: { status: ImageStatusType }) => {
  const color =
    STATUS_BORDER_COLORS[status] ?? STATUS_BORDER_COLORS[ImageStatus.UNKNOWN];

  return (
    <Chip
      size="medium"
      label={status}
      sx={{
        fontSize: "1rem",
        fontWeight: 600,
        color,
        backgroundColor: alpha(color, 0.12),
        border: `1px solid ${alpha(color, 0.45)}`,
        minWidth: "110px",
      }}
    />
  );
};

export const InfoTable = ({ title, rows }: InfoTableProps) => {
  return (
    <Box sx={{ marginBottom: "1.25rem" }}>
      <Typography
        sx={(theme) => ({
          fontSize: "1.25rem",
          fontWeight: 600,
          color: theme.palette.secondary.main,
          marginBottom: "0.5rem",
        })}
      >
        {title}
      </Typography>

      <TableContainer
        component={Paper}
        elevation={1}
        sx={{
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <Table size="medium">
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.label}>
                <TableCell
                  sx={{
                    width: "38%",
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    color: "text.secondary",
                    padding: "0.85rem 1rem",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  {row.label}
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: "1.05rem",
                    fontWeight: 500,
                    color: "text.primary",
                    padding: "0.85rem 1rem",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  {row.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export const PercentBar = ({ value }: { value: number }) => {
  const safeValue = Math.min(Math.max(value, 0), 100);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.35rem",
        }}
      >
        <Typography sx={{ fontSize: "1rem", fontWeight: 500 }}>
          Вероятность
        </Typography>

        <Typography sx={{ fontSize: "1rem", fontWeight: 600 }}>
          {safeValue.toFixed(2)}%
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={safeValue}
        sx={{
          height: 8,
          borderRadius: 999,
        }}
      />
    </Box>
  );
};
