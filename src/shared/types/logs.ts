// ── Log levels matching Python logging (10=DEBUG … 50=CRITICAL) ──
// POST /api/v1/logs

export const LevelLog = {
  DEBUG: 10,
  INFO: 20,
  WARNING: 30,
  ERROR: 40,
  CRITICAL: 50,
} as const;

export type LevelLogType = (typeof LevelLog)[keyof typeof LevelLog];

export interface ILog {
  level: LevelLogType; // API field name is "level", not "levelLog"
  message: string;
  meta?: string | null;
}
