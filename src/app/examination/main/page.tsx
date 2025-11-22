"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import AnimatedButton from "@/components/ui/AnimatedButton";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import LogoutButton from "@/components/ui/LogoutButton";

export default function ExaminationMainPage() {
  const router = useRouter();
  const [rollNumber, setRollNumber] = useState<string | null>(null);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("exam_auth");
    if (!isAuthenticated) {
      router.push("/examination");
    } else {
      setRollNumber(sessionStorage.getItem("exam_roll"));
    }
  }, [router]);

  if (rollNumber === null) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-50 px-6 py-10">
      <div className="absolute top-6 right-8 z-20">
        <LogoutButton />
      </div>

      <h1 className="mb-8 text-center font-extrabold text-4xl text-black tracking-tight">
        Examination Dashboard
      </h1>

      <p className="mb-12 text-center text-gray-700 text-lg">
        Welcome,&nbsp;
        <span className="font-semibold text-gray-900">{rollNumber}</span>
      </p>

      <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-8">
        <BackgroundGradient
          containerClassName="w-full sm:w-[45%] md:w-[32%] lg:w-[23%] rounded-3xl group"
          className="cursor-pointer overflow-hidden rounded-3xl border border-gray-200 bg-white/80 p-6 text-center shadow-md backdrop-blur-md transition-all hover:scale-[1.02]"
        >
          <div className="flex min-h-[220px] flex-col items-center justify-between">
            <div className="mb-3 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                role="img"
                aria-labelledby="fileSymlinkIconTitle"
                className="text-black transition-transform duration-300 group-hover:scale-110"
              >
                <title id="fileSymlinkIconTitle">Exam Registration Icon</title>
                <path d="M4 11V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7" />
                <path d="M14 2v5a1 1 0 0 0 1 1h5" />
                <path d="m10 18 3-3-3-3" />
              </svg>
            </div>
            <h3 className="font-semibold text-black text-lg">
              Exam Registration
            </h3>
            <p className="mt-2 text-gray-600 text-sm">
              Fill out your semester exam registration form.
            </p>
            <div className="mt-4 w-full text-center">
              <AnimatedButton label="Open" href="/examination/registration" />
            </div>
          </div>
        </BackgroundGradient>

        <BackgroundGradient
          containerClassName="w-full sm:w-[45%] md:w-[32%] lg:w-[23%] rounded-3xl group"
          className="cursor-pointer overflow-hidden rounded-3xl border border-gray-200 bg-white/80 p-6 text-center shadow-md backdrop-blur-md transition-all hover:scale-[1.02]"
        >
          <div className="flex min-h-[220px] flex-col items-center justify-between">
            <div className="mb-3 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                role="img"
                aria-labelledby="medalIconTitle"
                className="text-black transition-transform duration-300 group-hover:scale-110"
              >
                <title id="medalIconTitle">Grade Card Icon</title>
                <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
                <path d="M11 12 5.12 2.2" />
                <path d="m13 12 5.88-9.8" />
                <path d="M8 7h8" />
                <circle cx="12" cy="17" r="5" />
                <path d="M12 18v-2h-.5" />
              </svg>
            </div>
            <h3 className="font-semibold text-black text-lg">Grade Card</h3>
            <p className="mt-2 text-gray-600 text-sm">
              View and download your grade cards.
            </p>
            <div className="mt-4 w-full text-center">
              <AnimatedButton label="Open" href="/examination/gradecard" />
            </div>
          </div>
        </BackgroundGradient>

        <BackgroundGradient
          containerClassName="w-full sm:w-[45%] md:w-[32%] lg:w-[23%] rounded-3xl group"
          className="cursor-pointer overflow-hidden rounded-3xl border border-gray-200 bg-white/80 p-6 text-center shadow-md backdrop-blur-md transition-all hover:scale-[1.02]"
        >
          <div className="flex min-h-[220px] flex-col items-center justify-between">
            <div className="mb-3 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                role="img"
                aria-labelledby="idCardIconTitle"
                className="text-black transition-transform duration-300 group-hover:scale-110"
              >
                <title id="idCardIconTitle">Admit Card Icon</title>
                <path d="M16 10h2" />
                <path d="M16 14h2" />
                <path d="M6.17 15a3 3 0 0 1 5.66 0" />
                <circle cx="9" cy="11" r="2" />
                <rect x="2" y="5" width="20" height="14" rx="2" />
              </svg>
            </div>
            <h3 className="font-semibold text-black text-lg">Admit Card</h3>
            <p className="mt-2 text-gray-600 text-sm">
              Download your admit card for the current exam.
            </p>
            <div className="mt-4 w-full text-center">
              <AnimatedButton label="Open" href="/examination/admitcard" />
            </div>
          </div>
        </BackgroundGradient>

        <BackgroundGradient
          containerClassName="w-full sm:w-[45%] md:w-[32%] lg:w-[23%] rounded-3xl group"
          className="cursor-pointer overflow-hidden rounded-3xl border border-gray-200 bg-white/80 p-6 text-center shadow-md backdrop-blur-md transition-all hover:scale-[1.02]"
        >
          <div className="flex min-h-[220px] flex-col items-center justify-between">
            <div className="mb-3 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                role="img"
                aria-labelledby="walletIconTitle"
                className="text-black transition-transform duration-300 group-hover:scale-110"
              >
                <title id="walletIconTitle">Exam Fee Icon</title>
                <path d="M17 14h.01" />
                <path d="M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14" />
              </svg>
            </div>
            <h3 className="font-semibold text-black text-lg">Exam Fee</h3>
            <p className="mt-2 text-gray-600 text-sm">
              Check your exam fee payment status.
            </p>
            <div className="mt-4 w-full text-center">
              <AnimatedButton label="Open" href="/examination/examfee" />
            </div>
          </div>
        </BackgroundGradient>
      </div>
    </div>
  );
}
