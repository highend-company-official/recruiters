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
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

type Props = Tables<"company">;

const CompanyCard = (props: Props) => {
  const supabase = createClient();
  const router = useRouter();

  const logoImage = supabase.storage
    .from("company_logo_images")
    .getPublicUrl(props.logo ?? "").data.publicUrl;

  return (
    <Card
      className="border-gray-200 shadow-lg hover:shadow-xl mt-6 p-4 border rounded-lg transition-shadow duration-300 ease-in-out"
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
          <Badge
            variant="outline"
            className="bg-primary mt-2 px-2 py-1 rounded-full font-medium text-sm text-white"
          >
            최종 면접 진행중
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="mt-4">
        <HoverCard>
          <HoverCardTrigger>
            <span className="text-base text-primary hover:text-primary-dark underline cursor-pointer">
              채용 진행도: {80}%
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

        <Progress value={85} className="bg-gray-300 mt-4 rounded-full h-3">
          <div className="bg-green-500 rounded-full h-full" />
        </Progress>
      </CardContent>
      <CardFooter className="mt-4">
        <p className="text-gray-500 text-sm">Updated 2 days ago</p>
      </CardFooter>
    </Card>
  );
};

export default CompanyCard;
