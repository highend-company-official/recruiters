"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addMemo(stepId: number, memo: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("step_memo")
    .upsert({
      body: memo,
      step_id: stepId,
    })
    .eq("step_id", stepId);

  if (error) {
    throw error;
  }
  revalidatePath("/dashboard/company-detail/[company_id]", "layout");
}

export async function startProcess(companyId: number) {
  const supabase = createClient();

  const { error } = await supabase
    .from("hiring_steps")
    .update({ status: "in_progress" })
    .eq("company_id", companyId)
    .eq('"order"', 1);

  if (error) {
    console.error("Error starting process:", error);
    throw error;
  }

  revalidatePath("/dashboard/company-detail/[company_id]", "layout");
}

export async function passStep(companyId: number, stepId: number) {
  const supabase = createClient();

  const { data: stepData, error: updateError } = await supabase
    .from("hiring_steps")
    .update({ status: "completed" })
    .eq("company_id", companyId)
    .eq("id", stepId)
    .select();

  if (updateError) {
    console.error("Error completing step:", updateError);
    throw updateError;
  }

  const nextStep = stepData[0].id + 1;
  if (nextStep) {
    const { error: startError } = await supabase
      .from("hiring_steps")
      .update({ status: "in_progress" })
      .eq("id", nextStep);

    if (startError) {
      console.error("Error starting next step:", startError);
      throw startError;
    }
  }

  revalidatePath("/dashboard/company-detail/[company_id]", "layout");
}

export async function failStep(companyId: number, stepId: number) {
  const supabase = createClient();

  const { error: updateError } = await supabase
    .from("hiring_steps")
    .update({ status: "failed" })
    .eq("company_id", companyId)
    .eq("id", stepId)
    .select();

  if (updateError) {
    console.error("Error completing step:", updateError);
    throw updateError;
  }

  revalidatePath("/dashboard/company-detail/[company_id]", "layout");
}
