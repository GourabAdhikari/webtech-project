"use client";

import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Award,
  Building2,
  Calendar,
  CheckCircle,
  Home,
  PaintBucket,
  Pen,
  PenTool,
  Ruler,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import type React from "react";
import { useEffect, useRef, useState } from "react";

export default function AboutUsSection() {
  const [_isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });

  // Parallax effect for decorative elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const services = [
    {
      icon: <Pen className="h-6 w-6" />,
      secondaryIcon: (
        <Sparkles className="-top-1 -right-1 absolute h-4 w-4 text-[#A9BBC8]" />
      ),
      title: "Facilities & Resources",
      description:
        "The department offers modern computer labs, high-speed internet, research centers, and well-equipped classrooms to foster hands-on learning and innovation.",
      position: "left",
    },
    {
      icon: <Home className="h-6 w-6" />,
      secondaryIcon: (
        <CheckCircle className="-top-1 -right-1 absolute h-4 w-4 text-[#A9BBC8]" />
      ),
      title: "Placements",
      description:
        "With strong industry collaborations and dedicated training programs, our students consistently secure placements in top tech companies and startups across diverse domains.",
      position: "left",
    },
    {
      icon: <PenTool className="h-6 w-6" />,
      secondaryIcon: (
        <Star className="-top-1 -right-1 absolute h-4 w-4 text-[#A9BBC8]" />
      ),
      title: "Courses & Programs",
      description:
        "We offer undergraduate and postgraduate programs designed to blend core computing concepts with cutting-edge technologies like AI, Data Science, and Cybersecurity.",
      position: "left",
    },
    {
      icon: <PaintBucket className="h-6 w-6" />,
      secondaryIcon: (
        <Sparkles className="-top-1 -right-1 absolute h-4 w-4 text-[#A9BBC8]" />
      ),
      title: "Vision and Mission",
      description:
        "Our vision is to produce competent IT professionals and researchers who contribute to technological advancement. Our mission is to deliver quality education, promote innovation, and encourage ethical practices.",
      position: "right",
    },
    {
      icon: <Ruler className="h-6 w-6" />,
      secondaryIcon: (
        <CheckCircle className="-top-1 -right-1 absolute h-4 w-4 text-[#A9BBC8]" />
      ),
      title: "Reasearch Scholars",
      description:
        "Our research scholars engage in impactful work across areas such as Artificial Intelligence, Cloud Computing, Data Analytics, and Software Engineering.",
      position: "right",
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      secondaryIcon: (
        <Star className="-top-1 -right-1 absolute h-4 w-4 text-[#A9BBC8]" />
      ),
      title: "Staff Members",
      description:
        "The department is guided by experienced faculty members and dedicated technical staff committed to academic excellence and student development.",
      position: "right",
    },
  ];

  const stats = [
    { icon: <Award />, value: 150, label: "Faculties", suffix: "+" },
    { icon: <Users />, value: 1200, label: "Students", suffix: "+" },
    { icon: <Calendar />, value: 6, label: "Branches", suffix: "" },
    {
      icon: <TrendingUp />,
      value: 98,
      label: "Satisfaction Rate",
      suffix: "%",
    },
  ];

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-linear-to-b from-[#F2F2EB] to-[#F8F8F2] px-4 py-24 text-[#202e44]"
    >
      <motion.div
        className="absolute top-20 left-10 h-64 w-64 rounded-full bg-[#88734C]/5 blur-3xl"
        style={{ y: y1, rotate: rotate1 }}
      />
      <motion.div
        className="absolute right-10 bottom-20 h-80 w-80 rounded-full bg-[#A9BBC8]/5 blur-3xl"
        style={{ y: y2, rotate: rotate2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 h-4 w-4 rounded-full bg-[#88734C]/30"
        animate={{
          y: [0, -15, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute right-1/4 bottom-1/3 h-6 w-6 rounded-full bg-[#A9BBC8]/30"
        animate={{
          y: [0, 20, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="container relative z-10 mx-auto max-w-6xl"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div
          className="mb-6 flex flex-col items-center"
          variants={itemVariants}
        >
          <motion.span
            className="mb-2 flex items-center gap-2 font-medium text-[#88734C]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Zap className="h-4 w-4" />
            Gauhati University
          </motion.span>
          <h2 className="mb-4 text-center font-light text-4xl md:text-5xl">
            About Us
          </h2>
          <motion.div
            className="h-1 w-24 bg-[#88734C]"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          ></motion.div>
        </motion.div>

        <motion.p
          className="mx-auto mb-16 max-w-2xl text-center text-[#202e44]/80"
          variants={itemVariants}
        >
          The Department of Information Technology focuses on creating skilled
          professionals equipped with strong theoretical foundations and
          practical expertise in computing, software development, and emerging
          technologies.
        </motion.p>

        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-16">
            {services
              .filter((service) => service.position === "left")
              .map((service, index) => (
                <ServiceItem
                  key={`left-${service.title}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction="left"
                />
              ))}
          </div>

          <div className="order-first mb-8 flex items-center justify-center md:order-0 md:mb-0">
            <motion.div
              className="relative w-full max-w-xs"
              variants={itemVariants}
            >
              <motion.div
                className="relative aspect-3/4 overflow-hidden rounded-md bg-white shadow-xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <Image
                  src="/GU%20Digital%20Logo%20(1000%20x%201067).jpg"
                  alt="GU Digital Logo"
                  fill
                  sizes="(min-width: 768px) 320px, 100vw"
                  className="object-contain"
                />
                <motion.div
                  className="absolute inset-0 flex items-end justify-center bg-linear-to-t from-[#202e44]/50 to-transparent p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                ></motion.div>
              </motion.div>
              <motion.div
                className="-m-3 absolute inset-0 z-[-1] rounded-md border-4 border-[#A9BBC8]"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              ></motion.div>

              <motion.div
                className="-top-4 -right-8 absolute h-16 w-16 rounded-full bg-[#88734C]/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                style={{ y: y1 }}
              ></motion.div>
              <motion.div
                className="-bottom-6 -left-10 absolute h-20 w-20 rounded-full bg-[#A9BBC8]/15"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
                style={{ y: y2 }}
              ></motion.div>

              <motion.div
                className="-top-10 -translate-x-1/2 absolute left-1/2 h-3 w-3 rounded-full bg-[#88734C]"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              ></motion.div>
              <motion.div
                className="-bottom-12 -translate-x-1/2 absolute left-1/2 h-2 w-2 rounded-full bg-[#A9BBC8]"
                animate={{
                  y: [0, 10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              ></motion.div>
            </motion.div>
          </div>

          <div className="space-y-16">
            {services
              .filter((service) => service.position === "right")
              .map((service, index) => (
                <ServiceItem
                  key={`right-${service.title}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction="right"
                />
              ))}
          </div>
        </div>

        <motion.div
          ref={statsRef}
          className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          animate={isStatsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <StatCounter
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        <motion.div
          className="mt-20 flex flex-col items-center justify-between gap-6 rounded-xl bg-[#202e44] p-8 text-white md:flex-row"
          initial={{ opacity: 0, y: 30 }}
          animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex-1">
            <h3 className="mb-2 font-medium text-2xl">Ready to transform ?</h3>
          </div>
          <motion.button
            className="flex items-center gap-2 rounded-lg bg-[#88734C] px-6 py-3 font-medium text-white transition-colors hover:bg-[#88734C]/90"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

interface ServiceItemProps {
  icon: React.ReactNode;
  secondaryIcon?: React.ReactNode;
  title: string;
  description: string;
  variants: {
    hidden: { opacity: number; y?: number };
    visible: {
      opacity: number;
      y?: number;
      transition: { duration: number };
    };
  };
  delay: number;
  direction: "left" | "right";
}

function ServiceItem({
  icon,
  secondaryIcon,
  title,
  description,
  variants,
  delay,
  direction,
}: ServiceItemProps) {
  return (
    <motion.div
      className="group flex flex-col"
      variants={variants}
      transition={{ delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="mb-3 flex items-center gap-3"
        initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        <motion.div
          className="relative rounded-lg bg-[#88734C]/10 p-3 text-[#88734C] transition-colors duration-300 group-hover:bg-[#88734C]/20"
          whileHover={{
            rotate: [0, -10, 10, -5, 0],
            transition: { duration: 0.5 },
          }}
        >
          {icon}
          {secondaryIcon}
        </motion.div>
        <h3 className="font-medium text-[#202e44] text-xl transition-colors duration-300 group-hover:text-[#88734C]">
          {title}
        </h3>
      </motion.div>
      <motion.p
        className="pl-12 text-[#202e44]/80 text-sm leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.4 }}
      >
        {description}
      </motion.p>
      <motion.div
        className="mt-3 flex items-center pl-12 font-medium text-[#88734C] text-xs opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
      >
        <span className="flex items-center gap-1">
          Learn more <ArrowRight className="h-3 w-3" />
        </span>
      </motion.div>
    </motion.div>
  );
}

interface StatCounterProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix: string;
  delay: number;
}

function StatCounter({ icon, value, label, suffix, delay }: StatCounterProps) {
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: false });
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 10,
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value);
      setHasAnimated(true);
    } else if (!isInView && hasAnimated) {
      springValue.set(0);
      setHasAnimated(false);
    }
  }, [isInView, value, springValue, hasAnimated]);

  const displayValue = useTransform(springValue, (latest) =>
    Math.floor(latest),
  );

  return (
    <motion.div
      className="group flex flex-col items-center rounded-xl bg-white/50 p-6 text-center backdrop-blur-sm transition-colors duration-300 hover:bg-white"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay },
        },
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#202e44]/5 text-[#88734C] transition-colors duration-300 group-hover:bg-[#88734C]/10"
        whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
      >
        {icon}
      </motion.div>
      <motion.div
        ref={countRef}
        className="flex items-center font-bold text-3xl text-[#202e44]"
      >
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </motion.div>
      <p className="mt-1 text-[#202e44]/70 text-sm">{label}</p>
      <motion.div className="mt-3 h-0.5 w-10 bg-[#88734C] transition-all duration-300 group-hover:w-16" />
    </motion.div>
  );
}
