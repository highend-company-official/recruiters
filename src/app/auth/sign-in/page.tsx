import Link from "next/link";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import GithubSignInButton from "./GithubSignInButton";
import { signIn } from "./actions";

export default function Page() {
  return (
    <Card className="mx-auto mt-4 w-[400px]">
      <CardHeader className="space-y-1">
        <CardTitle className="font-bold text-2xl text-center">로그인</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <form action={signIn}>
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input id="email" type="email" name="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input id="password" type="password" name="password" required />
            </div>
            <Button type="submit" className="mt-4 w-full text-white">
              로그인
            </Button>
          </form>
          <GithubSignInButton />
        </div>

        <div className="text-right mt-3 text-xs">
          회원이 아니신가요?{" "}
          <Link className="text-primary" href="/auth/sign-up">
            회원가입
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
