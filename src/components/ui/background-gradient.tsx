import { motion, useAnimation } from "motion/react";
import type React from "react";

import { cn } from "@/lib/utils";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const controls = useAnimation();

  const variants = {
    initial: { backgroundPosition: "0 50%" },
    animate: { backgroundPosition: ["0 50%", "100% 50%", "0 50%"] },
  };

  return (
    <motion.div
      className={cn("group relative p-[4px]", containerClassName)}
      onHoverStart={() => controls.start("animate")}
      onHoverEnd={() => controls.stop()}
    >
      <motion.div
        variants={variants}
        initial="initial"
        animate={controls}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{ backgroundSize: "400% 400%" }}
        className={cn(
          "absolute inset-0 z-[1] rounded-3xl opacity-0 blur-xl transition-opacity duration-500 will-change-transform group-hover:opacity-100",
          "bg-[radial-gradient(circle_at_center,#2563eb_0%,#2563eb_40%,transparent_100%)]",
        )}
      />

      <div
        className={cn(
          "absolute inset-0 z-[1] rounded-3xl opacity-30 transition duration-500 will-change-transform",
          "bg-[radial-gradient(circle_at_center,#2563eb_0%,#2563eb_40%,transparent_100%)]",
        )}
      />

      <div className={cn("relative z-10", className)}>{children}</div>
    </motion.div>
  );
};
