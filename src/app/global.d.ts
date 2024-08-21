import { Database as DB } from "../lib/database.types";

declare global {
  type Database = DB;

  type ProcessStatus = "not_started" | "in_progress" | "completed";

  type Process = {
    id: number;
    stepName: string;
    status: ProcessStatus;
  };
}
