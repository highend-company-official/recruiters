import { Database as DB } from "../lib/database.types";

declare global {
  type Database = DB;

  type Sort = "new" | "old" | "high" | "low";
}
