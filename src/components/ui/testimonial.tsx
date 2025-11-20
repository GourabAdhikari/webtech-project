"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const testimonials = [
  {
    quote:
      "“The Supreme Commander of Camera Angles,” this HOD appears the moment a notebook opens, swooping in to click a photo “for reference” before anyone can blink. With the sacred ability to interrupt a lecture with “Wait—don't turn the page!”, he'll happily snatch your notes and take 17 dramatic shots of the same paragraph “just to be safe.”",
    name: "Dr. Jitankan Paul",
    designation: "Professor and HOD, Clicking Photographs",
    src: "/images/uni_prof/prof_pic5d.png",
  },
  {
    quote:
      "Dr. Ananya Sen is an experienced academic leader with expertise in Data Science and Machine Learning. She guides departmental activities and mentors students in research and innovation.",
    name: "Dr. Ananya Sen",
    designation: "Professor, Information Systems",
    src: "/images/uni_prof/prof_pic1c.png",
  },
  {
    quote:
      "Prof. Rahul Gupta specializes in Web Technologies and Software Engineering. He is passionate about teaching and helps students build strong practical skills in development.",
    name: "Prof. Rahul Gupta",
    designation: "Associate Professor, Computer Science",
    src: "/images/uni_prof/prof_pic2c.png",
  },
  {
    quote:
      "Dr. Meera Das focuses on Database Management Systems and Cloud Computing. She is dedicated to student-centered teaching and encourages hands-on learning.",
    name: "Dr. Meera Das",
    designation: "Assistant Professor, IT",
    src: "/images/uni_prof/prof_pic3c.png",
  },
  {
    quote:
      "Prof. Arup Nath has expertise in Cybersecurity and Network Administration. He actively supports student projects and promotes secure technology practices.",
    name: "Prof. Arup Nath",
    designation: "Dean, Faculty of Technology",
    src: "/images/uni_prof/prof_pic4c.png",
  },
];

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

const AnimatedTestimonials = ({
  testimonials,
  autoplay = true,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = React.useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [autoplay, handleNext]);

  const isActive = (index: number) => index === active;
  const baseRotate = (i: number) => `${((i * 7) % 16) - 8}deg`;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-8 font-sans antialiased md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 items-center gap-y-12 md:grid-cols-2 md:gap-x-20">
        <div className="flex items-center justify-center">
          <div className="relative h-[60vh] w-full max-w-md md:h-[70vh] md:max-w-lg lg:h-[80vh] lg:max-w-xl">
            <AnimatePresence initial={false}>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    y: 50,
                    rotate: baseRotate(index),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.5,
                    scale: isActive(index) ? 1 : 0.9,
                    y: isActive(index) ? 0 : 20,
                    zIndex: isActive(index)
                      ? testimonials.length
                      : testimonials.length - Math.abs(index - active),
                    rotate: isActive(index) ? "0deg" : baseRotate(index),
                  }}
                  exit={{ opacity: 0, scale: 0.9, y: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                  style={{ perspective: "1000px" }}
                >
                  <Image
                    src={testimonial.src}
                    alt={testimonial.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    draggable={false}
                    className="rounded-3xl object-cover shadow-2xl"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col justify-center py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-3xl text-slate-900 md:text-4xl dark:text-slate-50">
                  {testimonials[active].name}
                </h3>
                <p className="text-base text-slate-600 md:text-lg dark:text-slate-400">
                  {testimonials[active].designation}
                </p>
                <motion.p className="mt-10 text-slate-700 text-xl md:text-2xl dark:text-slate-300">
                  "{testimonials[active].quote}"
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-4 pt-12">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:bg-slate-800 dark:focus:ring-slate-500 dark:hover:bg-slate-700"
            >
              <ArrowLeft className="group-hover:-translate-x-1 h-5 w-5 text-slate-800 transition-transform duration-300 dark:text-slate-300" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:bg-slate-800 dark:focus:ring-slate-500 dark:hover:bg-slate-700"
            >
              <ArrowRight className="h-5 w-5 text-slate-800 transition-transform duration-300 group-hover:translate-x-1 dark:text-slate-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function AnimatedTestimonialsDemo() {
  return <AnimatedTestimonials testimonials={testimonials} />;
}

export function Component() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950">
      <style>
        {`
          @keyframes animate-grid {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
          .animated-grid {
            width: 200%;
            height: 200%;
            background-image: 
              linear-gradient(to right, #e2e8f0 1px, transparent 1px), 
              linear-gradient(to bottom, #e2e8f0 1px, transparent 1px);
            background-size: 3rem 3rem;
            animation: animate-grid 40s linear infinite alternate;
          }
          .dark .animated-grid {
            background-image: 
              linear-gradient(to right, #1e293b 1px, transparent 1px), 
              linear-gradient(to bottom, #1e293b 1px, transparent 1px);
          }
        `}
      </style>

      <div className="animated-grid -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 opacity-10" />

      <div className="z-10">
        <AnimatedTestimonialsDemo />
      </div>
    </div>
  );
}
