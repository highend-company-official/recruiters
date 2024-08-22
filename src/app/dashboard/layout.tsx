import { PropsWithChildren } from "react";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/shared/Header";

const Layout = async ({ children }: PropsWithChildren) => {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
      <Header title="대시보드" />

      <main className="mx-auto mt-4 px-4 md:px-6 container">{children}</main>
    </>
  );
};

export default Layout;
