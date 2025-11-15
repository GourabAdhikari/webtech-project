"use client";

import type React from "react";

interface AnimatedButtonProps {
  label?: string;
  href?: string;
  target?: string;
  className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  label = "Open",
  href = "#",
  className = "",
}) => {
  return (
    <a
      href={href}
      className={`cssbuttons-io-button inline-flex items-center justify-center ${className}`}
    >
      <span style={{ pointerEvents: "none" }}>{label}</span>
      <div className="icon" aria-hidden>
        <svg
          height="24"
          width="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-hidden="true"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
            fill="currentColor"
          />
        </svg>
      </div>
    </a>
  );
};

export default AnimatedButton;
