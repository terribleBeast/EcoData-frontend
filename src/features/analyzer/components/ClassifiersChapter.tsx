import { Box, Chip, Stack, Typography } from "@mui/material";
import { PageChapter } from "@/shared/ui/layout";
import { type IGenus } from "@/shared/types";
import { ClassifierDropdown } from "./ClassifierDropdown";
import { ChapterHeaderTemplate } from "@/shared/ui/ChapterHeader";
import { useClassifiers } from "../hooks/useClassifiers";
import { QueryState } from "@/shared/ui/states/QueryState";

type Props = {
  selectedGenus: IGenus | undefined;
  handleSelectGenera: (item: IGenus) => void;
  generaQuery: ReturnType<typeof useClassifiers>["generaQuery"];
  classifiers: ReturnType<typeof useClassifiers>["classifiers"];
};

export const ClassifiersChapter = ({
  selectedGenus,
  handleSelectGenera,
  classifiers,
  generaQuery,
}: Props) => {
  return (
    <PageChapter
      header={{
        component: (
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <ChapterHeaderTemplate
              header={{ title: "Роды и сорта растений" }}
            />
          </Box>
        ),
      }}
    >
      <Box sx={{ display: "grid", gridTemplateColumns: "400px 1fr ", gap: 4 }}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Род растения
          </Typography>
          {generaQuery.data ? (
            <ClassifierDropdown
              onSelect={(item: IGenus) => handleSelectGenera(item)}
              genera={generaQuery.data}
              selectedGenus={selectedGenus}
            />
          ) : (
            <QueryState
              isError={generaQuery.isError}
              isLoading={generaQuery.isLoading}
            />
          )}
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Сорта
          </Typography>

          <Stack direction="row" spacing={1.5} sx={{ flexWrap: "wrap" }}>
            {selectedGenus !== undefined ? (
              classifiers.map((item) => (
                <Chip
                  key={item.id}
                  label={item.name}
                  sx={{
                    height: 44,
                    px: 1,
                    fontSize: "1.2rem",
                    borderRadius: 2,
                    bgcolor: "#EAF4E8",
                    color: "success.dark",
                    fontWeight: 500,
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
                Чтобы увидеть доступные сорта, которых доступна классификация,
                выберите род растения
              </Typography>
            )}
          </Stack>
        </Box>
      </Box>
    </PageChapter>
  );
};
