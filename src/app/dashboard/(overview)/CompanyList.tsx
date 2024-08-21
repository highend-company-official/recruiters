import { createClient } from "@/utils/supabase/server";
import CompanyCard from "./CompanyCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CompanyList = async ({ userId }: { userId: string }) => {
  const supabase = createClient();

  const { data: companyList } = await supabase
    .from("company")
    .select("*, hiring_steps(*)")
    .eq("user_id", userId);

  if (!companyList) {
    return (
      <>
        <div className="top-0 z-50 fixed inset-0 flex justify-center items-center bg-black/50">
          <section className="flex flex-col justify-center items-center p-12 w-screen h-screen text-white wave-animation">
            <h2 className="mb-4 font-bold text-5xl text-center">
              최종 합격까지 리크루터스가 도와드릴게요.
            </h2>
            <p className="text-center text-lg leading-relaxed">
              리크루터스는 취업 목표 달성을 지원하기 위해 최선을 다하겠습니다.
              지금 회사 추가를 통해 더 많은 기회를 열어보세요.
            </p>
            <div className="mt-8">
              <Link href="/dashboard/company-add">
                <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg px-6 py-3 rounded-lg text-white transform transition duration-300 ease-in-out hover:scale-105">
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
    <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
      {companyList?.map((company) => (
        <CompanyCard key={company.id} {...company} />
      ))}
    </div>
  );
};

export default CompanyList;
