"use client";

import React from "react";
import { Reorder, motion } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";

type Props = {
  index: number;
  isLastStep: boolean;
  process: Process;
  onRemove: () => void;
};

const ProcessCard = ({ process, isLastStep, onRemove }: Props) => {
  return (
    <Reorder.Item
      value={process}
      as="li"
      id={process.id}
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
      <motion.div className="flex items-center justify-center w-32 h-32 border rounded-full shadow-md border-primary text-primary">
        <span className="px-2 text-sm font-semibold text-center">
          {process.stepName}
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

export default ProcessCard;
