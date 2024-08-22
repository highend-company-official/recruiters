import { Tables } from "@/lib/database.types";

const getStepPercent = (steps: Tables<"hiring_steps">[]) => {
  // 완료된 단계 수를 계산합니다.
  const completedSteps = steps.filter(
    (step) => step.status === "completed"
  ).length;

  // 총 단계 수
  const totalSteps = steps.length;

  // 퍼센트를 계산합니다.
  const progressPercentage =
    totalSteps > 0 ? Math.floor((completedSteps / totalSteps) * 100) : 0;

  return progressPercentage;
};

export default getStepPercent;
