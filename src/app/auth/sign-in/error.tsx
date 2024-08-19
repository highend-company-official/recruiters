"use client";

import { PiWarningCircleLight } from "react-icons/pi";
import { Button } from "@/components/ui/button";

const ErrorContainer = ({
  title,
  message,
  reset,
}: {
  title: string;
  message: string;
  reset: () => void;
}) => {
  return (
    <div className="flex flex-col justify-center items-center bg-background px-4 sm:px-6 lg:px-8 py-12">
      <div className="mx-auto max-w-md text-center">
        <PiWarningCircleLight />

        <h1 className="mt-4 font-bold text-3xl text-foreground sm:text-4xl tracking-tight">
          {title}
        </h1>
        <p className="mt-4 text-muted-foreground">{message}</p>
      </div>
      <div className="mt-6">
        <Button onClick={reset}>다시 시도하기</Button>
      </div>
    </div>
  );
};

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  if (error.message === "Invalid login credentials") {
    return (
      <ErrorContainer
        title="올바르지 않은 회원 정보"
        message="이메일이나 비밀번호가 잘못 입력되었습니다."
        reset={reset}
      />
    );
  }

  return (
    <ErrorContainer
      title="예기치 못한 오류가 발생했습니다."
      message="계속 이런 문제가 발생한다면 (functional.hong@gmail.com)으로 문의주세요."
      reset={reset}
    />
  );
};

export default Error;
