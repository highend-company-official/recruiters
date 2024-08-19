import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import CompanyCard from "./CompanyCard";

const Page = async () => {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/sign-in");
  }

  const { data: companyList } = await supabase
    .from("company")
    .select("*")
    .eq("user_id", session?.user.id);

  if (companyList?.length === 0) {
    return (
      <>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <section className="flex flex-col items-center justify-center w-screen h-screen p-12 text-white wave-animation">
            <h2 className="mb-4 text-5xl font-bold text-center">
              최종 합격까지 리크루터스가 도와드릴게요.
            </h2>
            <p className="text-lg leading-relaxed text-center">
              리크루터스는 취업 목표 달성을 지원하기 위해 최선을 다하겠습니다.
              지금 회사 추가를 통해 더 많은 기회를 열어보세요.
            </p>
            <div className="mt-8">
              <Link href="/dashboard/company-add">
                <Button className="px-6 py-3 text-white transition duration-300 ease-in-out transform bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105">
                  나의 첫 회사 추가
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 space-y-8">
      <div className="flex justify-center">
        <Link href="/dashboard/company-add">
          <Button className="px-8 py-4 text-lg font-semibold text-white transition duration-300 ease-in-out transform bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105">
            회사 등록
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        {companyList?.map((company) => (
          <CompanyCard key={company.id} {...company} />
        ))}
      </div>
    </div>
  );
};

export default Page;
