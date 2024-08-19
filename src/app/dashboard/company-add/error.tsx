"use client";

import { Button } from "@/components/ui/button";
import { PiWarningCircleLight } from "react-icons/pi";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="flex flex-col justify-center items-center bg-background px-4 sm:px-6 lg:px-8 py-12">
      <div className="mx-auto max-w-md text-center">
        <h1 className="mt-4 font-bold text-2xl text-foreground tracking-tight">
          등록 과정중에 오류가 발생했습니다.
        </h1>
      </div>
      <div className="mt-6">
        <Button onClick={reset}>다시 시도하기</Button>
      </div>
    </div>
  );
};

export default Error;
