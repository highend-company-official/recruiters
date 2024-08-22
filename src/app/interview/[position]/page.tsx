import { type Question } from "@/types";

import QuestionList from "./QuestionList";

import FRONTEND_QUESTIONS from "@/assets/frontend-question-list.json";
import BACKEND_QUESTIONS from "@/assets/backend-question-list.json";
import UX_QUESTIONS from "@/assets/ux-question-list.json";
import DATA_ANALYST_QUESTIONS from "@/assets/data_analyst-question-list.json";

const Page = async ({ params }: { params: { position: string } }) => {
  const position = params.position;

  const getPositionQuestions = (): Question[] => {
    switch (position) {
      case "frontend":
        return FRONTEND_QUESTIONS as Question[];
      case "backend":
        return BACKEND_QUESTIONS as Question[];
      case "ux":
        return UX_QUESTIONS as Question[];
      case "data-analyst":
        return DATA_ANALYST_QUESTIONS as Question[];
      default:
        return FRONTEND_QUESTIONS as Question[];
    }
  };

  return (
    <article className="px-4 w-full">
      <QuestionList questions={getPositionQuestions()} />{" "}
    </article>
  );
};

export default Page;
