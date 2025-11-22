"use client";

import { useRouter } from "next/navigation";
import type React from "react";

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/examination");
  };

  return (
    <button
      type="button" // ✅ Explicit type to satisfy Biome (prevents form submission)
      className="Btn"
      onClick={handleLogout}
      aria-label="Logout"
    >
      <div className="sign">
        <svg
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          role="img" // ✅ accessibility role
          aria-labelledby="logoutIconTitle"
        >
          <title id="logoutIconTitle">Logout Icon</title>{" "}
          <path
            d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9
            c-18.7 0-33.9-15.2-33.9-33.9v-62.1h-128c-17.7 0-32-14.3-32-32v-64
            c0-17.7 14.3-32 32-32h128v-62.1
            c0-18.7 15.2-33.9 33.9-33.9
            c9 0 17.6 3.6 24 9.9zM160 96H96
            c-17.7 0-32 14.3-32 32v256
            c0 17.7 14.3 32 32 32h64
            c17.7 0 32 14.3 32 32s-14.3 32-32 32H96
            c-53 0-96-43-96-96V128
            C0 75 43 32 96 32h64
            c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
            fill="white"
          />
        </svg>
      </div>
      <div className="text">Logout</div>
    </button>
  );
};

export default LogoutButton;
