"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { FaRegCircleCheck } from "react-icons/fa6";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import useTextField from "@/hooks/useTextField";
import useToggle from "@/hooks/useToggle";

import { signUp } from "./actions";

export default function Page() {
  const searchParams = useSearchParams();
  const [password, onChangePassword] = useTextField("");
  const [checkPassword, onChangeCheckPassword] = useTextField("");
  const [isPasswordNotCorrect, toggle] = useToggle(false);

  const status = searchParams.get("status");

  if (status === "success") {
    return (
      <Card className="mx-auto mt-4 w-[400px]">
        <CardHeader>
          <CardTitle className="flex flex-col justify-center items-center font-bold text-2xl">
            <FaRegCircleCheck className="text-3xl text-primary" />
            <span className="mt-4">회원가입을 완료했습니다.</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col mt-3 text-center">
            <span className="text-black">아래 버튼을 눌러 로그인 해주세요</span>
            <Link href="/auth/sign-in" className="mt-4">
              <Button>로그인</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="mx-auto mt-4 w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="font-bold text-2xl text-center">
            회원가입
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <form
              action={(formData) => {
                if (password !== checkPassword) {
                  toggle(true);
                  return;
                }

                signUp(formData);
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  value={password}
                  onChange={onChangePassword}
                  id="password"
                  name="password"
                  type="password"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-check">비밀번호 확인</Label>
                <Input
                  value={checkPassword}
                  onChange={onChangeCheckPassword}
                  id="password-check"
                  type="password"
                  required
                />
              </div>

              {isPasswordNotCorrect && (
                <Alert variant="destructive" className="my-4">
                  <AlertCircle className="w-4 h-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    비밀번호가 일치하지 않습니다.
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">성함</Label>
                <Input id="name" name="name" type="text" required />
              </div>
              <Button type="submit" className="mt-10 w-full text-white">
                회원가입
              </Button>
            </form>
          </div>

          <div className="text-right mt-3 text-xs">
            이미 회원이시면{" "}
            <Link className="text-primary" href="/auth/sign-in">
              로그인
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
