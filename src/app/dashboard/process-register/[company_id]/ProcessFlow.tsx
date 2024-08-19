"use client";

import React, { Dispatch, SetStateAction } from "react";
import ProcessCard from "./ProcessCard";
import { AnimatePresence, Reorder } from "framer-motion";

const ProcessFlow = ({
  processList,
  setProcessList,
}: {
  processList: Process[];
  setProcessList: Dispatch<SetStateAction<Process[]>>;
}) => {
  const handleRemoveProcess = (removeId: string) => {
    setProcessList((prev) => prev.filter(({ id }) => id !== removeId));
  };

  return (
    <>
      <Reorder.Group
        as="ol"
        axis="x"
        className="flex justify-start items-center w-full overflow-auto"
        values={processList}
        onReorder={setProcessList}
      >
        <AnimatePresence>
          {processList.map((process, index) => (
            <ProcessCard
              key={process.id}
              index={index}
              process={process}
              onRemove={() => handleRemoveProcess(process.id)}
              isLastStep={index === processList.length - 1}
            />
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </>
  );
};

export default ProcessFlow;
