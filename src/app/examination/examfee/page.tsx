"use client";

import { useQuery } from "convex/react";
import { ArrowUp, Banknote } from "lucide-react"; // ✅ Lucide Icons
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/../convex/_generated/api";
import { Spinner } from "@/components/ui/spinner";

export default function ExamFeePage() {
  const router = useRouter();
  const [rollNumber, setRollNumber] = useState<string | null>(null);

  useEffect(() => {
    const rn = sessionStorage.getItem("exam_roll");
    const isAuthenticated = sessionStorage.getItem("exam_auth");

    setRollNumber(rn);

    if (!isAuthenticated) router.push("/examination");
  }, [router]);

  const student = useQuery(
    api.students.getByRollNo,
    rollNumber ? { rollNo: rollNumber } : "skip",
  );

  if (student === undefined) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md rounded-2xl border border-blue-100 bg-white p-10 text-center shadow-lg">
        {/* 🏦 Lucide Icon */}
        <div className="mb-5 flex justify-center">
          <div className="flex items-center justify-center rounded-full bg-blue-100 p-4 text-blue-700 shadow-sm">
            <Banknote className="h-8 w-8" />
            <ArrowUp className="-ml-1 mt-3 h-5 w-5" />
          </div>
        </div>

        {/* 🧾 Title & Message */}
        <h1 className="mb-4 font-bold text-3xl text-black">Exam Fee Status</h1>

        {student?.feePaid ? (
          <p className="mb-2 text-gray-700">
            Your exam fee has been paid successfully.
          </p>
        ) : (
          <p className="mb-2 text-gray-700">Your exam fee not paid yet.</p>
        )}

        <p className="text-gray-500">Thank you!</p>
      </div>
    </div>
  );
}
