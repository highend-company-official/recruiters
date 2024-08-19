import { PropsWithChildren } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

import ProfileMenu from "./(overview)/ProfileMenu";

import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Layout = async ({ children }: PropsWithChildren) => {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
      <header className="text-black border-b shadow-sm bg-background">
        <div className="container flex items-center h-12 px-4 mx-auto md:px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-lg font-semibold"
            prefetch={false}
          >
            <span>Recruiters</span>
          </Link>
          <NavigationMenu className="flex items-center gap-4 ml-auto">
            <NavigationMenuList className="mr-4">
              <Link
                href="/dashboard/interview-question"
                legacyBehavior
                passHref
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  면접 질문
                </NavigationMenuLink>
              </Link>
              <Link href="/dashboard" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  채용 오버뷰
                </NavigationMenuLink>
              </Link>
            </NavigationMenuList>
            <ProfileMenu
              avatar={session?.user.user_metadata.avatar_url}
              name={session?.user.user_metadata.name}
            />
          </NavigationMenu>
        </div>
      </header>

      <main className="container px-4 mx-auto mt-4 md:px-6">{children}</main>
    </>
  );
};

export default Layout;
