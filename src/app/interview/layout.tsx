import { PropsWithChildren } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import ProfileMenu from "../interview/ProfileMenu";
import Header from "@/components/shared/Header";

const Layout = async ({ children }: PropsWithChildren) => {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
      <Header title="모의 인터뷰" />

      <main className="mx-auto mt-4 px-4 md:px-6 container">{children}</main>
    </>
  );
};

export default Layout;
