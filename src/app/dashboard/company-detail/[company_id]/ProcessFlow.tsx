"use client";

import React, { useState } from "react";
import { Tables } from "@/lib/database.types";
import useToggle from "@/hooks/useToggle";
import ProcessCard from "./ProcessCard";
import ProcessMemo from "./ProcessMemo";

type ProcessFlowProps = {
  processList: Tables<"hiring_steps">[];
};

type Memo = {
  id: number;
  name: string;
};

const ProcessFlow: React.FC<ProcessFlowProps> = ({ processList }) => {
  const [memoOpen, toggleMemo] = useToggle(false);
  const [memo, setMemo] = useState<Memo | null>(null);

  const handleToggleMemo = (process: Tables<"hiring_steps">) => {
    if (memoOpen && process.name === memo?.name) {
      toggleMemo(false);
      setMemo(null);
    } else {
      toggleMemo(true);
      setMemo({
        id: process.id,
        name: process.name ?? "",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex space-x-4 overflow-x-auto">
        {processList.map((process) => (
          <ProcessCard
            onClick={() => handleToggleMemo(process)}
            key={process.order}
            stepName={process.name!}
            order={process.order!}
            status={process.status!}
          />
        ))}
      </div>
      {memoOpen && memo && <ProcessMemo {...memo} />}
    </div>
  );
};

export default ProcessFlow;
