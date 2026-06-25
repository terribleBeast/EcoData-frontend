import { Box, Chip, CircularProgress, Stack, Typography } from "@mui/material";
import { PageChapter } from "@/shared/ui/layout";
import { type IGenus } from "@/shared/types";
import { ClassifierDropdown } from "./ClassifierDropdown";
import { ChapterHeaderTemplate } from "@/shared/ui/ChapterHeader";
import { useClassifiers } from "../hooks/useClassifiers";
import { useMemo } from "react";

type Props = {
  selectedGenus: IGenus | undefined;
  handleSelectGenera: (item: IGenus | null) => void | Promise<void>;
  generaQuery: ReturnType<typeof useClassifiers>["generaQuery"];
  availableSpeciesQuery: ReturnType<
    typeof useClassifiers
  >["availableSpeciesQuery"];
  classifiers: ReturnType<typeof useClassifiers>["classifiers"];
};

export const ClassifiersChapter = ({
  selectedGenus,
  handleSelectGenera,
  generaQuery,
  availableSpeciesQuery,
  classifiers,
}: Props) => {
  const orderedClassifiers = useMemo(() => {
    return [...classifiers].sort((a, b) => {
      const first = a.latin_name ?? "";
      const second = b.latin_name ?? "";

      return first.localeCompare(second, ["ru", "en"], {
        sensitivity: "base",
      });
    });
  }, [classifiers]);
  return (
    <PageChapter
      header={{
        component: (
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <ChapterHeaderTemplate header={{ title: "Роды и виды растений" }} />
          </Box>
        ),
      }}
    >
      <Box sx={{ display: "grid", gridTemplateColumns: "400px 1fr", gap: 4 }}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Род растения
          </Typography>

          <ClassifierDropdown
            value={selectedGenus}
            options={generaQuery.data ?? []}
            loading={generaQuery.isLoading || generaQuery.isFetching}
            onSelect={handleSelectGenera}
          />

          {generaQuery.isError && (
            <Typography color="error" variant="caption">
              Не удалось загрузить список родов
            </Typography>
          )}
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Виды с доступными моделями
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              width: "100%",
              maxWidth: "800px",
            }}
          >
            {selectedGenus !== undefined ? (
              orderedClassifiers.map((item) => (
                <Chip
                  key={item.id ?? item.species_id ?? item.latin_name}
                  label={item.russian_name}
                  sx={{
                    height: 44,
                    px: 1,
                    fontSize: "1.2rem",
                    borderRadius: 2,
                    bgcolor: "#EAF4E8",
                    color: "success.dark",
                    fontWeight: 500,
                    maxWidth: "100%",
                  }}
                />
              ))
            ) : (
              <Typography
                sx={{
                  padding: "1rem",
                  color: "text.secondary",
                  fontStyle: "italic",
                }}
              >
                Чтобы увидеть доступные виды, для которых доступна
                классификация, выберите род растения
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </PageChapter>
  );
};
