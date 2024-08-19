import { Database as DB } from "../lib/database.types-=2";

declare global {
  type Database = DB;

  type ProcessStatus = "not_started" | "in_progress" | "completed";

  type Process = {
    id: string;
    stepName: string;
    status: ProcessStatus;
  };
}
