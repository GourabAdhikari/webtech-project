"use client";

import { SignInButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const ShuffleHero = () => {
  return (
    <section className="mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 items-center gap-8 px-8 py-12 md:grid-cols-2">
      <div>
        <span className="mb-4 block font-medium text-primary text-xs md:text-sm">
          Gauhati University
        </span>
        <h3 className="font-semibold text-4xl text-foreground md:text-6xl">
          Department Of Information Technology
        </h3>
        <p className="my-4 text-base text-muted-foreground md:my-6 md:text-lg">
          The Department of Information Technology (renaming the Department of
          Computer & Information Technology in June 2012) under the Faculty of
          Technology, GU has been established to facilitate a state-of-the-art
          infrastructure for different Undergraduate, Postgraduate, and Research
          programs in the field of Computer and Information Technologies.
        </p>
        <SignInButton mode="modal">
          <button
            type="button"
            className={cn(
              "rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground",
              "transition-all hover:bg-primary/90 active:scale-95",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            )}
          >
            Get Started
          </button>
        </SignInButton>
      </div>
      <ShuffleGrid />
    </section>
  );
};

// 🔁 Utility to shuffle the image order
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  let currentIndex = arr.length;
  let randomIndex: number;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }

  return arr;
}

// ✅ Your 16 local images from /public/images/uni_pics/
const squareData = [
  { id: 1, src: "/images/uni_pics/gu_pic1.png" },
  { id: 2, src: "/images/uni_pics/gu_pic2.png" },
  { id: 3, src: "/images/uni_pics/gu_pic3.png" },
  { id: 4, src: "/images/uni_pics/gu_pic4.png" },
  { id: 5, src: "/images/uni_pics/gu_pic5.png" },
  { id: 6, src: "/images/uni_pics/gu_pic6.png" },
  { id: 7, src: "/images/uni_pics/gu_pic7.png" },
  { id: 8, src: "/images/uni_pics/gu_pic8.png" },
  { id: 9, src: "/images/uni_pics/gu_pic9.png" },
  { id: 10, src: "/images/uni_pics/gu_pic10.png" },
  { id: 11, src: "/images/uni_pics/gu_pic11.png" },
  { id: 12, src: "/images/uni_pics/gu_pic12.png" },
  { id: 13, src: "/images/uni_pics/gu_pic13.png" },
  { id: 14, src: "/images/uni_pics/gu_pic14.png" },
  { id: 15, src: "/images/uni_pics/gu_pic15.png" },
  { id: 16, src: "/images/uni_pics/gu_pic16.png" },
];

// Generate grid squares dynamically
const generateSquares = () =>
  shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="h-full w-full overflow-hidden rounded-md bg-muted"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  ));

const getInitialSquares = () =>
  squareData.map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="h-full w-full overflow-hidden rounded-md bg-muted"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  ));

const ShuffleGrid = () => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [squares, setSquares] = useState(() => getInitialSquares());

  const shuffleSquares = useCallback(() => {
    setSquares(generateSquares());
    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  }, []);

  useEffect(() => {
    shuffleSquares();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [shuffleSquares]);

  return (
    <div className="grid h-[55vh] grid-cols-4 grid-rows-4 gap-1 sm:h-[60vh] md:h-[65vh] lg:h-[70vh]">
      {squares}
    </div>
  );
};
