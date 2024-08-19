"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { v4 } from "uuid";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
import { Tables } from "@/lib/database.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useToggle from "@/hooks/useToggle";

import { SUGGEST_LIST } from "./constants";
import ProcessFlow from "./ProcessFlow";

const AddProcessForm = ({ name, logo }: Tables<"company">) => {
  const logoImage = bucketReader("company_logo_images", logo);
  const [stepName, setStepName] = useState("");
  const [isOpenStepList, toggleStepList] = useToggle(false);
  const [status, setStatus] = useState<ProcessStatus>("not_started");
  const [dialogOpen, toggleDialog] = useToggle(false);
  const [processList, setProcessList] = useState<Process[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!stepName) {
      toggleDialog(true);
      return;
    }

    const nextProcessItem = {
      id: v4(),
      stepName,
      status,
    };

    setProcessList((prev) => [...prev, nextProcessItem]);

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
      <CardHeader className="flex items-center justify-center space-x-4">
        <Avatar className="w-16 h-16 rounded-lg shadow-md">
          <AvatarImage src={logoImage} className="rounded-lg" />
          <AvatarFallback className="text-lg font-semibold bg-gray-200 rounded-lg">
            {name?.slice(0, 2)}
          </AvatarFallback>
        </Avatar>

        <CardTitle className="text-3xl font-bold text-center">
          채용과정 등록
        </CardTitle>
        <CardDescription>
          등록하신 회사 (<strong>{name}</strong>)의 채용 과정을 추가해주세요.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex items-center justify-center w-full mt-4">
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
              <PopoverContent className="w-full p-0">
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
            className="w-full px-4 py-2 font-semibold text-white transition duration-300 ease-in-out bg-blue-600 rounded shadow-md hover:bg-blue-700"
          >
            채용 과정 추가
          </Button>
        </form>
      </CardContent>

      {/* 채용 과정 리스트 */}
      <DndProvider backend={HTML5Backend}>
        <ProcessFlow
          processList={processList}
          setProcessList={setProcessList}
        />
      </DndProvider>

      {processList.length > 0 && (
        <div className="flex justify-center mt-6">
          <Button className="flex items-center justify-center px-4 py-2 font-semibold text-white transition duration-300 ease-in-out bg-green-600 rounded shadow-md hover:bg-green-700">
            <Check className="w-5 h-5 mr-2" />
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

export default AddProcessForm;
