"use client";

import { useQuery } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/../convex/_generated/api";
import type { Id } from "@/../convex/_generated/dataModel";
import { Spinner } from "@/components/ui/spinner";
import ViewButton from "@/components/ViewButton";

export default function AdmitCardPage() {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [studentId, setStudentId] = useState<Id<"students"> | null>();

  // 🔒 Redirect protection
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("exam_auth");
    const student_id = sessionStorage.getItem(
      "student_id",
    ) as Id<"students"> | null;
    setStudentId(student_id);
    if (!isAuthenticated) router.push("/examination");
  }, [router]);

  const admitCards = useQuery(
    api.documents.getAdmitCards,
    studentId ? { studentId: studentId } : "skip",
  );

  if (admitCards === undefined) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-gray-100 via-white to-gray-50 px-6 py-10">
      {/* 🔹 Page Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 font-extrabold text-3xl text-gray-900"
      >
        Admit Cards
      </motion.h1>

      <p className="mb-10 max-w-lg text-center text-gray-600">
        View and download your semester admit cards.
      </p>

      {/* 💠 Cards Container */}
      <div className="relative w-full max-w-3xl space-y-6 overflow-hidden rounded-3xl border border-blue-100 bg-white/90 p-8 shadow-xl">
        {admitCards.map((card) => (
          <button
            key={card.semester}
            type="button"
            onMouseEnter={() => setHoveredIndex(card.semester)}
            onMouseLeave={() => setHoveredIndex(null)}
            onFocus={() => setHoveredIndex(card.semester)}
            onBlur={() => setHoveredIndex(null)}
            className="relative w-full overflow-visible rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label={`View admit card for ${card.semester}`}
          >
            {/* 🌊 Subtle Single Blue Glow */}
            <AnimatePresence>
              {hoveredIndex === card.semester && (
                <motion.span
                  layoutId="hoverBackground"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1.05 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="-inset-2 absolute z-0 rounded-2xl bg-blue-200 opacity-60 blur-xl"
                  aria-hidden="true"
                />
              )}
            </AnimatePresence>

            {/* 🧱 Card */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
              className="relative z-10 flex h-20 items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <span className="font-semibold text-gray-800 text-lg">
                Semester {card.semester}
              </span>
              <ViewButton label="View" href={card.pdfUrl} />
            </motion.div>
          </button>
        ))}
      </div>
    </div>
  );
}
