import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export const dynamic = "force-dynamic";

const Layout = async ({ children }: PropsWithChildren) => {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-col justify-center items-center w-full h-screen text-white wave-animation">
      <h1 className="font-bold text-6xl">Recruiters</h1>
      <p className="mb-4 font-thin text-sm">최종합격을 위한 채용 도우미</p>
      {children}
    </main>
  );
};

export default Layout;
