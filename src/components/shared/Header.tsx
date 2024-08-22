import Link from "next/link";
import { PropsWithChildren } from "react";
import { RxExternalLink } from "react-icons/rx";

import { createClient } from "@/utils/supabase/server";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import ProfileMenu from "./ProfileMenu";

const Header = async ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
      <header className="bg-background shadow-sm border-b text-black">
        <div className="flex items-center mx-auto px-4 md:px-6 h-12 container">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 h-2/4 font-semibold text-lg"
            prefetch={false}
          >
            <span>Recruiters</span>
            <Separator orientation="vertical" />
            <span className="text-sm">{title}</span>
          </Link>
          <NavigationMenu className="flex items-center gap-4 ml-auto">
            <NavigationMenuList className="mr-4">
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                href="/interview"
              >
                모의 인터뷰
              </NavigationMenuLink>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                href="https://tech-hlog.vercel.app/"
                target="_blank"
              >
                HLOG
                <RxExternalLink size={16} className="ml-1" />
              </NavigationMenuLink>
            </NavigationMenuList>
            <ProfileMenu
              avatar={session?.user.user_metadata.avatar_url}
              name={session?.user.user_metadata.name}
            />
          </NavigationMenu>
        </div>
      </header>

      <main className="mx-auto mt-4 px-4 md:px-6 container">{children}</main>
    </>
  );
};

export default Header;
