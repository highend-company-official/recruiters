"use client";

import { v4 } from "uuid";
import { useRef, useState } from "react";
import { Check } from "lucide-react";
import { useParams } from "next/navigation";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import bucketReader from "@/utils/bucketReader";
import { Enums, Tables } from "@/lib/database.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useToggle from "@/hooks/useToggle";
import { StepState } from "@/types";

import { SUGGEST_LIST } from "./constants";
import ProcessFlow from "./StepFlow";
import { registProcess } from "./actions";

type Props = {
  name: string;
  logo: string;
  steps: Tables<"hiring_steps">[];
};

const AddStepForm = ({ name, logo, steps }: Props) => {
  const logoImage = bucketReader("company_logo_images", logo);
  const { company_id } = useParams<{ company_id: string }>();

  const nextId = useRef(1);

  const [stepName, setStepName] = useState("");
  const [isOpenStepList, toggleStepList] = useToggle(false);
  const [status, setStatus] = useState<Enums<"process_status">>("not_started");
  const [dialogOpen, toggleDialog] = useToggle(false);
  const [stepList, setStepList] = useState<StepState[]>(() =>
    steps.map((step) => ({
      id: step.id,
      name: step.name!,
      status: step.status!,
    }))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!stepName) {
      toggleDialog(true);
      return;
    }

    const nextProcessItem: StepState = {
      id: nextId.current++,
      name: stepName,
      status,
    };

    setStepList((prev) => [...prev, nextProcessItem]);

    // 폼 초기화
    setStepName("");
    setStatus("not_started");
  };

  const handleSelectStep = (stepName: string) => {
    setStepName(stepName || "");
    toggleStepList(false);
  };

  return (
    <>
      <CardHeader className="flex justify-center items-center space-x-4">
        <Avatar className="shadow-md mb-6 rounded-lg w-16 h-16">
          <AvatarImage src={logoImage} className="rounded-lg" />
          <AvatarFallback className="bg-gray-200 rounded-lg font-semibold text-lg">
            {name?.slice(0, 2)}
          </AvatarFallback>
        </Avatar>

        <CardTitle className="font-bold text-3xl text-center">
          채용과정 등록
        </CardTitle>
        <CardDescription>
          등록하신 회사 (<strong>{name}</strong>)의 채용 과정을 추가해주세요.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center items-center mt-4 w-full">
        <form onSubmit={handleSubmit} className="space-y-6 w-[300px]">
          {/* 채용 단계 선택 */}
          <div className="flex flex-col w-full">
            <Label htmlFor="stepName">추가할 채용 단계</Label>
            <Popover open={isOpenStepList} onOpenChange={toggleStepList}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="mt-2">
                  {stepName || "전형이 선택되지 않았습니다."}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-full">
                <Command>
                  <CommandInput placeholder="전형을 선택해주세요..." />
                  <CommandList>
                    <CommandEmpty>해당 전형이 없습니다.</CommandEmpty>
                    <CommandGroup>
                      {SUGGEST_LIST.map((suggest) => (
                        <CommandItem
                          key={suggest}
                          onSelect={() => handleSelectStep(suggest)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              stepName === suggest ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {suggest}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* 제출 버튼 */}
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 shadow-md px-4 py-2 rounded w-full font-semibold text-white transition duration-300 ease-in-out"
          >
            채용 과정 추가
          </Button>
        </form>
      </CardContent>

      {/* 채용 과정 리스트 */}
      <ProcessFlow stepList={stepList} setStepList={setStepList} />

      {stepList.length > 0 && (
        <div className="flex justify-center mt-6">
          <Button
            className="flex justify-center items-center bg-green-600 hover:bg-green-700 shadow-md px-4 py-2 rounded font-semibold text-white transition duration-300 ease-in-out"
            onClick={async () =>
              await registProcess(Number(company_id), stepList)
            }
          >
            <Check className="mr-2 w-5 h-5" />
            확정
          </Button>
        </div>
      )}

      {/* 경고 다이얼로그 */}
      <AlertDialog open={dialogOpen} onOpenChange={toggleDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>채용 과정을 입력해주세요.</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>닫기</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddStepForm;
