import { Card } from "@/components/ui/card";
import HiringProcessForm from "./AddProcessForm";
import { createClient } from "@/utils/supabase/server";

const Page = async ({ params }: { params: { company_id: string } }) => {
  const companyId = params.company_id;
  const supabase = createClient();

  // Fetch Company Info
  const { data } = await supabase
    .from("company")
    .select("*")
    .eq("id", companyId);

  const company = data?.[0];

  if (!company) {
    return (
      <Card className="mx-auto p-6 sm:p-8 md:p-10 max-w-4xl">
        찾으시는 회사가 없습니다.
      </Card>
    );
  }

  return (
    <Card className="mx-auto p-6 sm:p-8 md:p-10 max-w-4xl">
      <HiringProcessForm {...company} />
    </Card>
  );
};

export default Page;
