import Link from "next/link";
import { IoIosSettings } from "react-icons/io";

import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div className="z-50 fixed flex justify-center items-center bg-black/60 w-full h-screen">
      <section className="flex flex-col justify-center items-center p-10 w-full h-full text-center text-white wave-animation">
        <IoIosSettings size={80} className="mb-10 animate-spin-slow" />
        <h2 className="mb-6 font-bold text-4xl md:text-5xl tracking-wide">
          해당 기능은 준비중입니다.
        </h2>

        <p className="mb-8 text-lg md:text-xl leading-relaxed">
          리크루터스는 여러분의 성공적인 취업을 위해 최선의 서비스를 제공하기
          위해 노력합니다.
        </p>
        <div>
          <Link href="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg px-8 py-4 rounded-lg font-semibold text-base text-white transform transition duration-300 ease-in-out hover:scale-105">
              메인 화면으로 돌아가기
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Page;
