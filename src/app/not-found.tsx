import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-background px-4 sm:px-6 lg:px-8 py-12 min-h-[100dvh]">
      <div className="mx-auto max-w-md text-center">
        <h1 className="mt-4 font-bold text-9xl text-foreground tracking-tight">
          404
        </h1>
        <p className="mt-4 font-medium text-muted-foreground text-xl">
          죄송합니다, 요청하신 페이지를 찾을 수 없습니다.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center bg-primary hover:bg-primary/90 shadow-sm px-4 py-2 rounded-md focus:ring-2 focus:ring-primary focus:ring-offset-2 font-medium text-primary-foreground text-sm transition-colors focus:outline-none"
            prefetch={false}
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NotFoundPage;
