// log levels for logging python lib
export const LevelLog = {
  INFO: 10,
  DEBUG: 20,
  ERROR: 30,
  WARNING: 40,
  CRITICAL: 50,
} as const;

export type LevelLogType = (typeof LevelLog)[keyof typeof LevelLog];

export interface ILog {
  levelLog: LevelLogType;
  message: string;
  meta?: string;
}
