import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import CompanyList from "./CompanyList";

const Page = async () => {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="mx-auto mt-12 max-w-4xl">
      <div className="flex justify-center">
        <Link href="/dashboard/company-add">
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg px-8 py-4 rounded-lg font-semibold text-lg text-white transform transition duration-300 ease-in-out hover:scale-105">
            회사 등록
          </Button>
        </Link>
      </div>

      <CompanyList userId={session.user.id} />
    </div>
  );
};

export default Page;
