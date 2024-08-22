import React, { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowRightIcon } from "lucide-react";
import { failStep, passStep, startProcess } from "./actions";
import { Tables } from "@/lib/database.types";
import { useParams } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import StepMemo from "./StepMemo";

type StepCardProps = Tables<"hiring_steps">;

const InProgressIndicator = () => {
  return (
    <Badge className="top-[-25px] left-1/2 absolute transform -translate-x-1/2">
      진행중
    </Badge>
  );
};

const OptionTooltip = ({
  children,
  message,
}: PropsWithChildren<{ message: string }>) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side="bottom" align="center">
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ProcessOptionButton = ({
  onClickPass,
  onClickFail,
}: {
  onClickPass: () => void;
  onClickFail: () => void;
}) => {
  const withStopPropagation = (handler: () => void) => {
    return (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation(); // 이벤트 전파를 막음
      handler(); // 원래 핸들러 실행
    };
  };

  return (
    <div className="z-50 flex -space-x-px mt-2 isolate">
      <OptionTooltip message="합격 버튼을 누르면 다음 채용과정으로 넘어갑니다.">
        <Button
          className="rounded-r-none text-sm"
          onClick={withStopPropagation(onClickPass)}
        >
          합격
        </Button>
      </OptionTooltip>
      <OptionTooltip message="탈락 버튼을 누르면 해당 회사에서의 채용과정이 중지됩니다.">
        <Button
          variant="outline"
          className="rounded-l-none text-sm"
          onClick={withStopPropagation(onClickFail)}
        >
          탈락
        </Button>
      </OptionTooltip>
    </div>
  );
};

const ProcessStartButton = ({ onClick }: { onClick: () => void }) => {
  const handleClickButton: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.stopPropagation();
    onClick();
  };

  return (
    <Button className="mt-2" onClick={handleClickButton}>
      <span className="text-xs">프로세스 시작</span>
      <ArrowRightIcon size={12} />
    </Button>
  );
};

const MemoDialog = ({
  children,
  stepId,
  disabled,
}: PropsWithChildren<{
  stepId: number;
  disabled: boolean;
}>) => {
  if (disabled) return children;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <StepMemo stepId={stepId} />
      </DialogContent>
    </Dialog>
  );
};

const StepCard: React.FC<StepCardProps> = ({
  id: stepId,
  name,
  order,
  status,
}) => {
  const { company_id: companyId } = useParams<{ company_id: string }>();

  const disabled = status === "not_started";
  const isFirstStep = order === 1;
  const isNotStarted = isFirstStep && status === "not_started";

  return (
    <>
      <MemoDialog stepId={stepId} disabled={disabled}>
        <div className="relative flex flex-col items-center">
          {status === "in_progress" && <InProgressIndicator />}
          <div
            aria-disabled={disabled}
            className={cn(
              "flex flex-col items-center justify-center w-32 h-32 p-4 border rounded-lg shadow-sm hover:bg-black/20 cursor-pointer transition ease-in-out select-none",
              status === "completed"
                ? "bg-green-100 border-green-500"
                : status === "in_progress"
                ? "bg-blue-100 border-blue-500"
                : status === "failed"
                ? "bg-red-100 border-red-500"
                : "bg-gray-100 border-gray-300",
              disabled && "cursor-not-allowed",
              isNotStarted && isFirstStep && "animate-blink-border border-2"
            )}
          >
            <div
              className={cn(
                "text-lg font-semibold text-center",
                status === "completed"
                  ? "text-green-600"
                  : status === "in_progress"
                  ? "text-blue-600"
                  : status === "failed"
                  ? "text-red-600"
                  : "text-gray-600"
              )}
            >
              {name}
            </div>
            <div className="text-gray-500 text-sm">Step {order}</div>
          </div>
          {isNotStarted && (
            <ProcessStartButton
              onClick={() => startProcess(Number(companyId))}
            />
          )}
          {status === "in_progress" && (
            <ProcessOptionButton
              onClickPass={() => passStep(Number(companyId), stepId)}
              onClickFail={() => failStep(Number(companyId), stepId)}
            />
          )}
        </div>
      </MemoDialog>
    </>
  );
};

export default StepCard;
