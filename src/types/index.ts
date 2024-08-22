import { Enums } from "@/lib/database.types";

export type Question = {
  question: string;
  answer: string;
  subQuestion: Question;
};

export type StepState = {
  id: number;
  name: string;
  status: Enums<"process_status">;
};
