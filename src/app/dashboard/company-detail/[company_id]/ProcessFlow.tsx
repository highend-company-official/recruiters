"use client";

import React, { useState } from "react";
import ProcessCard from "./ProcessCard";
import { Tables } from "@/lib/database.types";
import ProcessMemo from "./ProcessMemo";

type ProcessFlowProps = {
  processList: Tables<"hiring_steps">[];
};

type Memo = {
  id: number;
  name: string;
};

const ProcessFlow: React.FC<ProcessFlowProps> = ({ processList }) => {
  const [memo, setMemo] = useState<Memo | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex space-x-4 overflow-x-auto">
        {processList.map((process) => (
          <ProcessCard
            onClick={() =>
              setMemo({
                id: process.id,
                name: process.name ?? "",
              })
            }
            key={process.order}
            stepName={process.name!}
            order={process.order!}
            status={process.status!}
          />
        ))}
      </div>
      {memo && <ProcessMemo {...memo} />}
    </div>
  );
};

export default ProcessFlow;
