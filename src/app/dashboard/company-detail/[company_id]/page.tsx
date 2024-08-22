import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/utils/supabase/server";

import { Progress } from "@/components/ui/progress";
import getStepPercent from "@/utils/getStepPercent";

import WhyRegisterCard from "./WhyRegistCompanyCard";
import StepFlow from "./StepFlow";
import AllPassConfetti from "./AllPassConfetti";

const Page = async ({ params }: { params: { company_id: string } }) => {
  const companyId = params.company_id;
  const supabase = createClient();

  // Fetch Company Info
  const { data: companyData } = await supabase
    .from("company")
    .select("*, hiring_steps(*)")
    .order("order", { referencedTable: "hiring_steps" })
    .eq("id", companyId);

  const company = companyData?.[0];

  if (!company) {
    return (
      <Card className="mx-auto p-6 sm:p-8 md:p-10 max-w-4xl">
        찾으시는 회사가 없습니다.
      </Card>
    );
  }

  const {
    data: { publicUrl: logoImage },
  } = supabase.storage
    .from("company_logo_images")
    .getPublicUrl(company.logo || "");

  const progressPercentage = getStepPercent(company.hiring_steps);

  return (
    <>
      <Card className="mx-auto mt-8 p-6 sm:p-8 md:p-10 max-w-4xl">
        <CardHeader>
          <div className="flex flex-col justify-center items-center w-full">
            <Avatar className="shadow-md mb-6 rounded-lg w-16 h-16">
              <AvatarImage src={logoImage} className="rounded-lg" />
              <AvatarFallback className="bg-gray-200 rounded-lg font-semibold text-lg">
                {company.name?.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="w-full font-bold text-3xl text-center break-words">
              {company.name}
            </CardTitle>

            <CardDescription className="mt-2 text-gray-500">
              {company.description || "회사에 대한 설명이 없습니다."}
            </CardDescription>
            {company.website && (
              <Link
                href={company.website}
                passHref
                target="_blank"
                className="text-primary underline"
              >
                {company.website}
              </Link>
            )}
          </div>

          <span className="text-base text-primary">
            채용 진행도: {progressPercentage}%
          </span>

          <Progress
            value={progressPercentage}
            className="bg-gray-300 mt-4 rounded-full h-3"
          />
        </CardHeader>

        <CardContent className="mt-4">
          {company.hiring_steps.length === 0 ? (
            <>
              <WhyRegisterCard />

              <Link
                href={`/dashboard/step-register/${companyId}`}
                passHref
                className="inline-flex justify-center items-center bg-blue-600 hover:bg-blue-700 shadow-lg px-6 py-3 rounded-lg font-semibold text-white transform transition duration-300 ease-in-out hover:scale-105"
              >
                채용과정 등록
              </Link>
            </>
          ) : (
            <StepFlow stepList={company.hiring_steps} />
          )}
        </CardContent>
      </Card>
      {progressPercentage === 100 && <AllPassConfetti />}
    </>
  );
};

export default Page;
