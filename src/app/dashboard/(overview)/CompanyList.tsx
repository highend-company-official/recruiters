import Link from "next/link";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";

import CompanyCard from "./CompanyCard";

export const dynamic = "force-dynamic";

type Params = {
  sort: string;
  userId: string;
};

const CompanyList = async ({ sort, userId }: Params) => {
  const supabase = createClient();

  const getCompanyList = async () => {
    // 모든 회사와 연결된 채용 단계를 가져옵니다.
    const { data: companies, error } = await supabase
      .from("company")
      .select("*, hiring_steps(*)")
      .eq("user_id", userId);

    if (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
      return null;
    }

    // 각 회사별 진행도를 계산합니다.
    const sortedCompanies = companies.map((company) => {
      const steps = company.hiring_steps || []; // 채용 단계가 없을 경우 빈 배열로 처리

      const completedSteps = steps.filter(
        (step) => step.status === "completed"
      ).length;

      const totalSteps = steps.length;

      // 진행도가 없을 경우 0으로 처리
      const progress = totalSteps === 0 ? 0 : completedSteps / totalSteps;

      return {
        ...company,
        progress,
      };
    });

    // 정렬 로직
    if (sort === "high") {
      sortedCompanies.sort((a, b) => b.progress - a.progress); // 진행도 높은 순
    } else if (sort === "low") {
      sortedCompanies.sort((a, b) => a.progress - b.progress); // 진행도 낮은 순
    } else if (sort === "new") {
      sortedCompanies.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ); // 최신순
    } else if (sort === "old") {
      sortedCompanies.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      ); // 오래된 순
    }

    return sortedCompanies;
  };

  const companyList = await getCompanyList();

  if (companyList?.length === 0) {
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
