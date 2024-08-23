import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

const Home = async () => {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen wave-animation">
      <h1 className="mb-4 font-bold text-3xl text-center text-white sm:text-5xl md:text-6xl tracking-tighter">
        잠재력을 깨우세요
      </h1>
      <p className="max-w-[600px] text-center text-white md:text-xl">
        최적의 회사를 찾는 과정까지 저희 리크루터스는 함께합니다.
      </p>
      <div className="flex min-[400px]:flex-row flex-col gap-2 mt-4">
        <Link
          href="/auth/sign-in"
          className="border-white hover:border-white hover:bg-white mt-8 px-4 py-2 border rounded-md text-white hover:text-black transition-colors"
        >
          시작하기
        </Link>
      </div>
    </div>
  );
};

export default Home;
