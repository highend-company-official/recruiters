import { PropsWithChildren } from "react";

import Header from "@/components/shared/Header";

const Layout = async ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header title="대시보드" />

      <main className="mx-auto mt-4 px-4 md:px-6 container">{children}</main>
    </>
  );
};

export default Layout;
