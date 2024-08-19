import React from "react";
import { cn } from "@/lib/utils"; // Utility function for conditional classNames

type ProcessCardProps = {
  stepName: string;
  order: number;
  status: "not_started" | "in_progress" | "completed";
  onClick: () => void;
};

const ProcessCard: React.FC<ProcessCardProps> = ({
  stepName,
  order,
  status,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center w-32 h-32 p-4 border rounded-lg shadow-sm  hover:bg-black/20 cursor-pointer transition ease-in-out select-none",
        status === "completed"
          ? "bg-green-100 border-green-500"
          : status === "in_progress"
          ? "bg-blue-100 border-blue-500"
          : "bg-gray-100 border-gray-300"
      )}
    >
      <div
        className={cn(
          "text-lg font-semibold text-center",
          status === "completed"
            ? "text-green-600"
            : status === "in_progress"
            ? "text-blue-600"
            : "text-gray-600"
        )}
      >
        {stepName}
      </div>
      <div className="text-gray-500 text-sm">Step {order}</div>
    </div>
  );
};

export default ProcessCard;
