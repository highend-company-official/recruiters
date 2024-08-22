"use server";

import { TablesInsert } from "@/lib/database.types";
import { StepState } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function registProcess(companyId: number, steps: StepState[]) {
  const supabase = createClient();

  // 기존의 hiring_steps 삭제
  const { error: deleteError } = await supabase
    .from("hiring_steps")
    .delete()
    .eq("company_id", companyId);

  if (deleteError) {
    console.log(deleteError);
    throw deleteError;
  }

  const processMap: TablesInsert<"hiring_steps">[] = steps.map(
    (value, index) => {
      return {
        name: value.name,
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
