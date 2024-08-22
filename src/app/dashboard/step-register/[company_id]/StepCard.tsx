"use client";

import React from "react";
import { Reorder, motion } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";
import { StepState } from "@/types";

type Props = {
  index: number;
  isLastStep: boolean;
  step: StepState;
  onRemove: () => void;
};

const StepCard = ({ step, isLastStep, onRemove }: Props) => {
  return (
    <Reorder.Item
      value={step}
      as="li"
      id={step.id}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.15 },
      }}
      className="flex items-center cursor-pointer"
      onDoubleClick={onRemove}
      exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
      transition={{ duration: 0.2 }}
    >
      <motion.div className="flex justify-center items-center border-primary shadow-md border rounded-full w-32 h-32 text-primary">
        <span className="px-2 font-semibold text-center text-sm">
          {step.name}
        </span>
      </motion.div>
      {!isLastStep && (
        <div className="ml-2">
          <IoIosArrowForward className="mr-1 text-3xl text-primary" />
        </div>
      )}
    </Reorder.Item>
  );
};

export default StepCard;
