import { Box, Chip, CircularProgress, Stack, Typography } from "@mui/material";
import { PageChapter } from "@/shared/ui/layout";
import { type IGenus } from "@/shared/types";
import { ClassifierDropdown } from "./ClassifierDropdown";
import { ChapterHeaderTemplate } from "@/shared/ui/ChapterHeader";
import { useClassifiers } from "../hooks/useClassifiers";

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

          <Stack
            direction="row"
            spacing={1.5}
            sx={{ flexWrap: "wrap", gap: 1 }}
          >
            {availableSpeciesQuery.isFetching && <CircularProgress size={24} />}

            {!availableSpeciesQuery.isFetching &&
              classifiers.map((item) => (
                <Chip
                  key={item.id}
                  label={
                    item.russian_name
                      ? `${item.latin_name} (${item.russian_name})`
                      : item.latin_name
                  }
                  sx={{
                    height: 44,
                    px: 1,
                    fontSize: "1.1rem",
                    borderRadius: 2,
                    bgcolor: "#EAF4E8",
                    color: "success.dark",
                    fontWeight: 500,
                  }}
                />
              ))}

            {!availableSpeciesQuery.isFetching &&
              selectedGenus &&
              classifiers.length === 0 && (
                <Typography
                  sx={{
                    padding: "1rem",
                    color: "text.secondary",
                    fontStyle: "italic",
                  }}
                >
                  Для выбранного рода нет видов с доступными моделями
                </Typography>
              )}

            {!selectedGenus && (
              <Typography
                sx={{
                  padding: "1rem",
                  color: "text.secondary",
                  fontStyle: "italic",
                }}
              >
                Чтобы увидеть доступные виды, выберите род растения
              </Typography>
            )}
          </Stack>
        </Box>
      </Box>
    </PageChapter>
  );
};
