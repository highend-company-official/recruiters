import { createClient } from "./supabase/client";

const bucketReader = (bucketName: string, path: string | null) => {
  if (!path) return "";

  const supabase = createClient();
  const data = supabase.storage.from(bucketName).getPublicUrl(path);

  return data.data.publicUrl;
};

export default bucketReader;
