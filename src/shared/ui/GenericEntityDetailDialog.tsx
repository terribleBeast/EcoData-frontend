import { Dialog } from "@mui/material";
import { useNavigate } from "react-router";
import { LoadingState } from "../components";
import type { DetailDialogModeType } from "../utils";
import { useCallback } from "react";
import { QueryErrorState } from "./states/ErrorState";
import { NotFoundState } from "./states/NotFoundState";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type EntityDetailDialogProps<TDetail extends { id: number }> = {
  data: TDetail | undefined;
  state: {
    isLoading: boolean;
    isError: boolean;
    error: FetchBaseQueryError | SerializedError | undefined;
  };
  /** Render the read-only detail view. */
  renderRead: (detail: TDetail) => React.ReactNode;

  /** Render the create form. Called when route is /new. */
  renderCreate: (onClose: () => void) => React.ReactNode;

  /** Render the edit form. Called when route is /:id/edit. */
  renderEdit: (detail: TDetail, onClose: () => void) => React.ReactNode;

  /** Max width for the dialog. Defaults to "xl". */
  readonly maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";

  readonly mode: DetailDialogModeType;
};

export function GenericEntityDetailDialog<TDetail extends { id: number }>({
  renderRead,
  renderCreate,
  mode,
  data,
  state,
  renderEdit,
  maxWidth = "xl",
}: EntityDetailDialogProps<TDetail>) {
  const navigate = useNavigate();
  const handleClose = useCallback(() => {
    // Navigate to the entity base path (the parent layout route)
    navigate("..");
  }, [navigate]);
  const renderDialogContent = useCallback(() => {
    if (state.isLoading) {
      return <LoadingState />;
    }

    if (state.isError) {
      return <QueryErrorState error={state.error} />;
    }

    switch (mode) {
      case "create":
        return renderCreate(handleClose);

      case "edit":
        return data ? renderEdit(data, handleClose) : <NotFoundState />;

      case "read":
        return data ? renderRead(data) : <NotFoundState />;
    }
  }, [renderCreate, renderEdit, handleClose, renderRead, data, mode, state]);

  const dialogMaxWidth = mode === "create" || mode === "edit" ? "xs" : maxWidth;

  return (
    <Dialog open fullWidth maxWidth={dialogMaxWidth} onClose={handleClose}>
      {renderDialogContent()}
    </Dialog>
  );
}
