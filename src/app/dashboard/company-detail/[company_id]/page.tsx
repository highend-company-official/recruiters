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

const Page = async ({ params }: { params: { company_id: string } }) => {
  const companyId = params.company_id;
  const supabase = createClient();

  // Fetch Company Info
  const { data: companyData } = await supabase
    .from("company")
    .select("*")
    .eq("id", companyId);

  const company = companyData?.[0];

  if (!company) {
    return (
      <Card className="max-w-4xl p-6 mx-auto sm:p-8 md:p-10">
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
      <Card className="max-w-4xl p-6 mx-auto mt-8 sm:p-8 md:p-10">
        <CardHeader className="flex items-center">
          <Avatar className="w-16 h-16 rounded-lg shadow-md">
            <AvatarImage src={logoImage} className="rounded-lg" />
            <AvatarFallback className="text-lg font-semibold bg-gray-200 rounded-lg">
              {company.name?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-center justify-center w-full">
            <CardTitle className="w-full text-3xl font-bold text-center break-words">
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

        <CardContent className="mt-4 space-y-6">
          <WhyRegisterCard />

          <div className="flex justify-center">
            <Link href={`/dashboard/process-register/${companyId}`} passHref>
              <Button>채용과정 등록하기</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Page;
