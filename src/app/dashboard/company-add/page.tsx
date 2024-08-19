import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { addCompany } from "./actions";

export default function Page() {
  return (
    <Card className="max-w-4xl p-6 mx-auto sm:p-8 md:p-10">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">회사 추가</CardTitle>
        <CardDescription>
          채용 진행 예정이거나 진행중인 회사의 정보를 입력해주세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid grid-cols-1 gap-6" action={addCompany}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="company-name" className="flex items-center">
                <span>회사 이름</span>
                <Badge className="ml-2">Required</Badge>
              </Label>
              <Input
                id="company-name"
                placeholder="(주) 하이앤드컴퍼니"
                name="name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company-description">회사 설명</Label>
              <Textarea
                id="company-description"
                name="description"
                placeholder="이 회사의 간단한 정보를 입력해주세요."
                className="min-h-[100px]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company-logo">회사 로고</Label>
              <Input
                id="company-logo"
                type="file"
                name="logo"
                accept="image/*"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company-website">회사 웹사이트</Label>
              <Input
                id="company-website"
                name="website"
                placeholder="웹사이트를 입력해주세요."
              />
            </div>
          </div>
          <Button type="submit">등록</Button>
        </form>
      </CardContent>
    </Card>
  );
}
