import { LoadingState } from "@/shared/components";
import type { IResearcherData } from "@/shared/types/researcher";
import { QueryErrorState } from "@/shared/ui/states/ErrorState";
import { List, ListItemButton, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const ResearchersList = ({
  researchersQuery,
}: {
  researchersQuery: {
    data?: IResearcherData[];
    isLoading: boolean;
    isError: boolean;
    error?: FetchBaseQueryError | SerializedError;
  };
}) => {
  if (researchersQuery.isLoading) {
    return <LoadingState />;
  }

  if (researchersQuery.isError) {
    return <QueryErrorState error={researchersQuery.error} />;
  }

  if (!researchersQuery.data?.length) {
    return (
      <Typography
        sx={{
          padding: "1rem",
          color: "text.secondary",
          fontStyle: "italic",
        }}
      >
        Нет участников
      </Typography>
    );
  }

  return (
    <List>
      {researchersQuery.data.map((researcher, index) => (
        <ListItemButton
          key={researcher.id}
          component={RouterLink}
          to={`/researchers/${researcher.id}`}
        >
          <Typography>
            {index + 1}. {researcher.surname} {researcher.name[0]}.{" "}
            {researcher.patronymic[0]}.
          </Typography>
        </ListItemButton>
      ))}
    </List>
  );
};
