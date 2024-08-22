"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";

import { Tables } from "@/lib/database.types";
import useToggle from "@/hooks/useToggle";

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Kbd } from "@/components/ui/kbd";

import StepCard from "./StepCard";

import { Edit } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import StepMemo from "./StepMemo";

type StepFlowProps = {
  stepList: Tables<"hiring_steps">[];
};

const StepFlow: React.FC<StepFlowProps> = ({ stepList }) => {
  const { company_id: companyId } = useParams<{ company_id: string }>();

  return (
    <>
      <div className="flex justify-between items-end mb-4">
        <span className="text-sm">
          채용과정이 진행중이거나 완료되면 <Kbd>간단한 메모</Kbd>를 할 수
          있습니다.
        </span>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <HoverCard openDelay={0} closeDelay={0}>
                <HoverCardTrigger asChild>
                  <NavigationMenuLink
                    href={`/dashboard/step-register/${companyId}`}
                    className={`${navigationMenuTriggerStyle()}`}
                  >
                    <Edit size={16} className="mr-2" />
                    채용과정 수정
                  </NavigationMenuLink>
                </HoverCardTrigger>
                <HoverCardContent className="bg-gray-100 shadow-md mt-2 p-4 rounded-lg text-sm">
                  채용과정을 수정하면{" "}
                  <strong className="text-bold">
                    지금까지 진행한 내용들이 초기화됩니다.
                  </strong>
                </HoverCardContent>
              </HoverCard>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex flex-col gap-4">
        <ScrollArea>
          <div className="flex space-x-4 mt-8 mb-4">
            {stepList.map((step) => (
              <StepCard key={step.id} {...step} />
            ))}
          </div>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};

export default StepFlow;
