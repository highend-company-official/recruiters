"use client";
import { useEffect } from "react";
import classNames from "classnames";
import { IoIosArrowForward } from "react-icons/io";

import { type Question } from "@/types";
import useToggle from "@/hooks/useToggle";

type Props = {
  questionData: Question;
  isSubQuestion?: boolean;
  parentOpen?: boolean;
};

const QuestionItem = ({
  questionData,
  isSubQuestion = false,
  parentOpen,
}: Props) => {
  const [open, toggle] = useToggle(parentOpen);
  const [forceOpen, toggleForceOpen] = useToggle(parentOpen);

  const handleToggleItem = (event: React.MouseEvent) => {
    event.stopPropagation();
    toggle();
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "i" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
        toggleForceOpen();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle, toggleForceOpen]);

  return (
    <div
      className={classNames(
        "transition-all duration-300 p-4 rounded-lg cursor-pointer",
        open ? "bg-gray-100" : "bg-white",
        isSubQuestion && "ml-8 border-l-4 border-primary pl-4 mt-4 shadow-md "
      )}
      onClick={handleToggleItem}
    >
      <h4
        className={classNames(
          "text-lg font-semibold flex items-center justify-between",
          open ? "text-primary" : "text-gray-800"
        )}
      >
        {questionData.question}
        <span
          className={classNames(
            "ml-2 transform transition-transform",
            open ? "rotate-90 text-primary" : "text-gray-500"
          )}
        >
          <IoIosArrowForward />
        </span>
      </h4>

      {open && (
        <div className="border-gray-300 mt-3 pl-4 border-l-2">
          <p className="text-gray-700">{questionData.answer}</p>

          {questionData.subQuestion && (
            <QuestionItem
              parentOpen={forceOpen}
              isSubQuestion={true}
              questionData={questionData.subQuestion}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionItem;
