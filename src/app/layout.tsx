import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "리크루터스",
  description: "최종합격을 위한 채용 도우미",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
