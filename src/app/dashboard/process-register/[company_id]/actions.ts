"use server";

import { TablesInsert } from "@/lib/database.types";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function registProcess(companyId: number, process: Process[]) {
  const supabase = createClient();

  const processMap: TablesInsert<"hiring_steps">[] = process.map(
    (value, index) => {
      return {
        name: value.stepName,
        order: index + 1,
        status: "not_started",
        company_id: companyId,
      };
    }
  );

  const { error } = await supabase.from("hiring_steps").insert(processMap);

  if (error) {
    console.log(error);
    throw error;
  }

  redirect(`/dashboard/company-detail/${companyId}`);
}
