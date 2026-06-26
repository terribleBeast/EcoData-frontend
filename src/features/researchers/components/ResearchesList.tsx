import { LoadingState } from "@/shared/components";
import type { IResearchData } from "@/shared/types/research";
import { List, ListItemButton, Typography } from "@mui/material";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Link as RouterLink } from "react-router";

export const ResearchesList = ({
  researchesQuery,
}: {
  researchesQuery: {
    data?: IResearchData[];
    isLoading: boolean;
    isError: boolean;
    error?: FetchBaseQueryError | SerializedError;
  };
}) => {
  if (researchesQuery.isLoading) {
    return <LoadingState />;
  }

  if (researchesQuery.isError) {
    return (
      <Typography color="error">Не удалось загрузить исследования</Typography>
    );
  }

  if (!researchesQuery.data?.length) {
    return (
      <Typography
        sx={{
          padding: "1rem",
          color: "text.secondary",
          fontStyle: "italic",
        }}
      >
        Исследователь пока не участвует ни в одном исследовании
      </Typography>
    );
  }

  return (
    <List>
      {researchesQuery.data.map((item, index) => (
        <ListItemButton
          component={RouterLink}
          to={`/researches/${item.id}`}
          key={item.id}
        >
          <Typography>
            {index + 1}.&nbsp;{item.title}
          </Typography>
        </ListItemButton>
      ))}
    </List>
  );
};
