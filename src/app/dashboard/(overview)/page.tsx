import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import CompanyList from "./CompanyList";
import OverviewSetting from "./OverviewSetting";

export const dynamic = "force-dynamic";

const Page = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/sign-in");
  }

  const sort = (searchParams?.sort as string) ?? "new";
  const userId = session.user.id;

  return (
    <div className="mx-auto mt-12 max-w-4xl">
      <OverviewSetting />

      <CompanyList sort={sort} userId={userId} />
    </div>
  );
};

export default Page;
