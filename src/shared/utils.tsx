/** Regex explanation:
 *  ^[a-zA-Z0-9._-]+  - local part
 *  @[a-zA-Z0-9.-]+   - domain
 *  \.[a-zA-Z]{2,}$   - TLD (min 2 chars)
 */

import Typography from "@mui/material/Typography";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/** Derive a human-readable error message from the raw RTK Query error. */
export const deriveErrorMessage = (
  err: FetchBaseQueryError | SerializedError | undefined,
): string => {
  if (!err) return "Неизвестная ошибка";

  // FetchBaseQueryError (network failure, HTTP error, etc.)
  if (typeof err === "object" && err !== null && "status" in err) {
    const status = (err as { status: number | string }).status;
    if (status === "FETCH_ERROR" || status === "PARSING_ERROR")
      return "Не удалось подключиться к серверу";

    // TODO: Check display error message
    // return `Ошибка сервера (${status}) ${err.data.detail}`;
    return `Ошибка сервера (${status})`;
  }

  // SerializedError (from rejectWithValue or custom middleware)
  if (typeof err === "object" && err !== null && "message" in err) {
    return (err as { message: string }).message;
  }
  return String(err);
};

export const DetailDialogModes = ["read", "create", "edit"] as const;

export type DetailDialogModeType = (typeof DetailDialogModes)[number];

export const getDialogType = (pathname: string): DetailDialogModeType => {
  if (pathname.endsWith("/new")) return "create";
  if (/\/.*\/edit$/.test(pathname)) return "edit";
  return "read";
};

export const checkNull = (field: string | null | undefined) =>
  field ? field : <Typography sx={{ fontStyle: "italic" }}> Нет </Typography>;

export const checkNullName = (field: { name: string } | null | undefined) =>
  field ? field.name : "—";
