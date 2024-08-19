import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { createClient } from "@/utils/supabase/server";
import { Tables } from "@/lib/database.types";

export async function addCompany(formData: FormData) {
  "use server";

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let data: Partial<Tables<"company">> = {
    name: formData.get("name")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    website: formData.get("website")?.toString() || "",
    user_id: user?.id!,
  };

  const logoFile = formData.get("logo");

  if (logoFile && logoFile instanceof File) {
    const fileExtension = logoFile.name.split(".").pop(); // 파일 확장자 추출
    const filename = `${uuidv4()}.${fileExtension}`; // 파일 이름에 확장자 추가
    const uploadResponse = await supabase.storage
      .from("company_logo_images")
      .upload(filename, logoFile, {
        contentType: logoFile.type,
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadResponse.error) {
      throw new Error(`File upload error: ${uploadResponse.error.message}`);
    }

    const path = uploadResponse.data?.path;
    data = { ...data, logo: path };
  }

  const { error } = await supabase.from("company").insert(data);

  if (error) {
    throw error;
  }

  redirect("/dashboard");
}
