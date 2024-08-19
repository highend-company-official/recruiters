import Link from "next/link";
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
import { createClient } from "@/utils/supabase/server";

type Props = Tables<"company">;

const CompanyCard = (props: Props) => {
  const supabase = createClient();

  const logoImage = supabase.storage
    .from("company_logo_images")
    .getPublicUrl(props.logo ?? "").data.publicUrl;

  return (
    <Link href={`/dashboard/company-detail/${props.id}`}>
      <Card className="p-4 mt-6 transition-shadow duration-300 ease-in-out border border-gray-200 rounded-lg shadow-lg hover:shadow-xl">
        <CardHeader className="flex flex-row items-center">
          <Avatar className="w-16 h-16 rounded-lg shadow-md">
            <AvatarImage src={logoImage} className="rounded-lg" />
            <AvatarFallback className="text-lg font-semibold bg-gray-200 rounded-lg">
              {props.name?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="w-full ml-4">
            <CardTitle className="w-9/12 overflow-hidden text-2xl font-bold text-gray-800 text-ellipsis whitespace-nowrap">
              {props.name}
            </CardTitle>
            <Badge
              variant="outline"
              className="px-2 py-1 mt-2 text-sm font-medium text-white rounded-full bg-primary"
            >
              최종 면접 진행중
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="mt-4">
          <HoverCard>
            <HoverCardTrigger>
              <span className="text-base underline cursor-pointer text-primary hover:text-primary-dark">
                채용 진행도: {80}%
              </span>
            </HoverCardTrigger>
            <HoverCardContent className="p-4 bg-gray-100 rounded-lg shadow-md">
              <p className="text-sm text-gray-700 text-pretty">
                채용 진행도는 남은 합류 과정을 기반으로 계산된 값이므로
                <strong className="font-bold">
                  {" "}
                  실제 진행도와는 차이가 있을 수 있습니다.
                </strong>
              </p>
            </HoverCardContent>
          </HoverCard>

          <Progress value={85} className="h-3 mt-4 bg-gray-300 rounded-full">
            <div className="h-full bg-green-500 rounded-full" />
          </Progress>
        </CardContent>
        <CardFooter className="mt-4">
          <p className="text-sm text-gray-500">Updated 2 days ago</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CompanyCard;
