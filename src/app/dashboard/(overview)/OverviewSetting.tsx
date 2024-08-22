"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OverviewSetting = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChangeValue = (value: Sort) => {
    router.push("/dashboard?sort=" + value);
    router.refresh();
  };

  return (
    <div className="flex justify-between">
      <Select
        onValueChange={handleChangeValue}
        value={searchParams.get("sort") ?? "new"}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="정렬 기준을 선택해주세요." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="new">최신순</SelectItem>
          <SelectItem value="old">오래된 순</SelectItem>
          <SelectItem value="high">진행도 높은 순</SelectItem>
          <SelectItem value="low">진행도 낮은 순</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex">
        <Link href="/dashboard/company-add">
          <Button className="rounded-r-none">회사 등록</Button>
        </Link>

        <Button variant="outline" className="rounded-l-none">
          회사 수정
        </Button>
      </div>
    </div>
  );
};

export default OverviewSetting;
