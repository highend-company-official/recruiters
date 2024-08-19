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
import { Button } from "@/components/ui/button";

import WhyRegisterCard from "./WhyRegistCompanyCard";
import ProcessFlow from "./ProcessFlow";
import { Kbd } from "@/components/ui/kbd";

const Page = async ({ params }: { params: { company_id: string } }) => {
  const companyId = params.company_id;
  const supabase = createClient();

  // Fetch Company Info
  const { data: companyData } = await supabase
    .from("company")
    .select("*, hiring_steps(*)")
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

  return (
    <>
      <Card className="mx-auto mt-8 p-6 sm:p-8 md:p-10 max-w-4xl">
        <CardHeader className="flex items-center">
          <Avatar className="shadow-md rounded-lg w-16 h-16">
            <AvatarImage src={logoImage} className="rounded-lg" />
            <AvatarFallback className="bg-gray-200 rounded-lg font-semibold text-lg">
              {company.name?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col justify-center items-center w-full">
            <CardTitle className="w-full font-bold text-3xl text-center break-words">
              {company.name}
            </CardTitle>

            <CardDescription className="mt-2 text-gray-500">
              {company.description || "회사에 대한 설명이 없습니다."}
            </CardDescription>
            {company.website && (
              <Link href={company.website} passHref target="_blank">
                <Button variant="link">{company.website}</Button>
              </Link>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6 mt-4">
          {company.hiring_steps.length === 0 ? (
            <>
              <WhyRegisterCard />

              <div className="flex justify-center">
                <Link
                  href={`/dashboard/process-register/${companyId}`}
                  passHref
                >
                  <Button>채용과정 등록하기</Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="flex flex-col justify-center">
              <div className="flex justify-between items-end mb-4">
                <span className="text-sm">
                  채용과정을 클릭하면 <Kbd>간단한 메모</Kbd>를 할 수 있습니다.
                </span>
                <Link
                  href={`/dashboard/process-register/${companyId}`}
                  passHref
                >
                  <Button>채용과정 수정하기</Button>
                </Link>
              </div>
              <ProcessFlow processList={company.hiring_steps} />
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Page;
