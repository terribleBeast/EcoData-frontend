import type { ILog } from "@/shared/types/logs";
import { apiSlice } from "../apiSlice";

const logsEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendLogToServer: builder.mutation<null, ILog>({
      query: (logInfo) => ({
        url: "/logs",
        method: "POST",
        body: logInfo,
      }),
    }),
  }),
});

export const { useSendLogToServerMutation } = logsEndpoints;
