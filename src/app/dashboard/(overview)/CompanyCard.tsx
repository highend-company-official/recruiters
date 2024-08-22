"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { Tables } from "@/lib/database.types";
import getStepPercent from "@/utils/getStepPercent";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

type Props = Tables<"company"> & {
  hiring_steps: Tables<"hiring_steps">[];
};

const BadgetHoverCard = ({
  children,
  message,
}: PropsWithChildren<{
  message: React.ReactNode;
}>) => {
  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent className="bg-gray-100 shadow-md mt-2 p-4 rounded-lg">
        <p className="text-sm">{message}</p>
      </HoverCardContent>
    </HoverCard>
  );
};

const CompanyCard = (props: Props) => {
  const supabase = createClient();
  const router = useRouter();

  const logoImage = supabase.storage
    .from("company_logo_images")
    .getPublicUrl(props.logo ?? "").data.publicUrl;

  const progressPercentage = getStepPercent(props.hiring_steps);

  const sortedSteps = props.hiring_steps.sort((a, b) => a.order! - b.order!);

  const currentStep = sortedSteps.find((step) => step.status === "in_progress");
  const isPending = sortedSteps[0]?.status === "not_started";
  const isComplete = progressPercentage === 100;
  const isFalied = sortedSteps.some((step) => step.status === "failed");

  return (
    <Card
      className="border-gray-200 shadow-lg hover:shadow-xl mt-6 p-4 border rounded-lg transition-shadow duration-300 cursor-pointer ease-in-out"
      onClick={() => router.push(`/dashboard/company-detail/${props.id}`)}
    >
      <CardHeader className="flex flex-row items-center">
        <Avatar className="shadow-md rounded-lg w-16 h-16">
          <AvatarImage src={logoImage} className="rounded-lg" />
          <AvatarFallback className="bg-gray-200 rounded-lg font-semibold text-lg">
            {props.name?.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 w-full">
          <CardTitle className="w-9/12 font-bold text-2xl text-ellipsis text-gray-800 whitespace-nowrap overflow-hidden">
            {props.name}
          </CardTitle>

          {!!currentStep && (
            <BadgetHoverCard
              message={
                <p>
                  현재{" "}
                  <strong className="text-bold text-primary">
                    {currentStep?.name}
                  </strong>
                  이 진행중입니다.
                </p>
              }
            >
              <Badge
                variant="secondary"
                className="mt-2 px-2 py-1 rounded-full font-medium text-primary text-sm"
              >
                진행중
              </Badge>
            </BadgetHoverCard>
          )}

          {isPending && (
            <BadgetHoverCard
              message={
                <p>
                  <strong className="text-bold text-primary">
                    &quot;보류중&quot;
                  </strong>
                  이란 아직 채용과정이 시작되지 않았음을 의미합니다. 채용과정을
                  시작해보세요.
                </p>
              }
            >
              <Badge
                variant="outline"
                className="bg-foreground/10 mt-2 px-2 py-1 rounded-full font-medium text-black text-sm"
              >
                보류중
              </Badge>
            </BadgetHoverCard>
          )}

          {isComplete && (
            <BadgetHoverCard
              message={
                <p>
                  <strong className="text-bold text-primary">
                    {props.name}
                  </strong>
                  에 최종 합격하셨습니다! 축하합니다.
                </p>
              }
            >
              <Badge
                variant="default"
                className="mt-2 px-2 py-1 rounded-full font-medium text-sm text-white"
              >
                최종 합격
              </Badge>
            </BadgetHoverCard>
          )}

          {isFalied && (
            <BadgetHoverCard
              message={
                <p>
                  <strong className="text-bold text-primary">
                    {props.name}
                  </strong>
                  에 안타깝게도 불합격 하셨습니다.
                </p>
              }
            >
              <Badge
                variant="destructive"
                className="mt-2 px-2 py-1 rounded-full font-medium text-sm text-white"
              >
                불합격
              </Badge>
            </BadgetHoverCard>
          )}
        </div>
      </CardHeader>
      <CardContent className="mt-2">
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger>
            <span className="text-base text-primary hover:text-primary-dark underline cursor-pointer">
              채용 진행도: {progressPercentage}%
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="bg-gray-100 shadow-md p-4 rounded-lg">
            <p className="text-gray-700 text-pretty text-sm">
              채용 진행도는 남은 합류 과정을 기반으로 계산된 값이므로
              <strong className="font-bold">
                {" "}
                실제 진행도와는 차이가 있을 수 있습니다.
              </strong>
            </p>
          </HoverCardContent>
        </HoverCard>

        <Progress
          value={progressPercentage}
          className="bg-gray-300 mt-4 rounded-full h-3"
        />
      </CardContent>
      <CardFooter className="mt-4">
        <p className="text-gray-500 text-sm">Updated 2 days ago</p>
      </CardFooter>
    </Card>
  );
};

export default CompanyCard;
