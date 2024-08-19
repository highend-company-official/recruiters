import { Question } from "@/types";

import QuestionItem from "./QuestionItem";
import { Kbd } from "@/components/ui/kbd";

const QuestionList = ({ questions }: { questions: Question[] }) => {
  return (
    <div>
      <div className="flex justify-end items-center mr-4 mb-4 text-sm">
        <Kbd>Command + i</Kbd>
        <span className="text-black">로 토글할 수 있습니다.</span>
      </div>
      {questions.map((questionData, index) => (
        <QuestionItem key={index} questionData={questionData} />
      ))}
    </div>
  );
};

export default QuestionList;
