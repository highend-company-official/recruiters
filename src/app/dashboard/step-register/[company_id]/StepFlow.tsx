"use client";

import React, { Dispatch, SetStateAction } from "react";
import StepCard from "./StepCard";
import { AnimatePresence, Reorder } from "framer-motion";
import { StepState } from "@/types";

const StepFlow = ({
  stepList,
  setStepList,
}: {
  stepList: StepState[];
  setStepList: Dispatch<SetStateAction<StepState[]>>;
}) => {
  const handleRemoveProcess = (removeId: number) => {
    setStepList((prev) => prev.filter(({ id }) => id !== removeId));
  };

  return (
    <>
      <Reorder.Group
        as="ol"
        axis="x"
        className="flex justify-start items-center w-full overflow-auto"
        values={stepList}
        onReorder={setStepList}
      >
        <AnimatePresence>
          {stepList.map((step, index) => (
            <StepCard
              key={step.id}
              index={index}
              step={step}
              onRemove={() => handleRemoveProcess(step.id)}
              isLastStep={index === stepList.length - 1}
            />
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </>
  );
};

export default StepFlow;
