import Link from "next/link";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex w-full">
      <div className="flex flex-col gap-4 bg-background p-6 border-r w-64 shrink-0">
        <h2 className="font-bold text-xl">포지션</h2>
        <div className="flex flex-col gap-2">
          <Link
            href="/dashboard/interview-question/frontend"
            className="hover:bg-accent px-4 py-2 rounded-md hover:text-accent-foreground transition-colors"
            prefetch={false}
          >
            프론트엔드 개발자
          </Link>
          <Link
            href="/dashboard/interview-question/backend"
            className="hover:bg-accent px-4 py-2 rounded-md hover:text-accent-foreground transition-colors"
            prefetch={false}
          >
            백엔드 개발자
          </Link>
          <Link
            href="/dashboard/interview-question/ux"
            className="hover:bg-accent px-4 py-2 rounded-md hover:text-accent-foreground transition-colors"
            prefetch={false}
          >
            UX 디자이너
          </Link>
          <Link
            href="/dashboard/interview-question/data-analyst"
            className="hover:bg-accent px-4 py-2 rounded-md hover:text-accent-foreground transition-colors"
            prefetch={false}
          >
            데이터 분석가
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center py-4 w-full">
        {children}
      </div>
    </div>
  );
};

export default Layout;
