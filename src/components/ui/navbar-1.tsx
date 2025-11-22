"use client";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Examination", href: "/examination" },
  { name: "Faculties", href: "/faculties" },
  { name: "Courses", href: "/courses" },
  { name: "Contact-Us", href: "/contact-us" },
] as const;

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Clerk user hook
  const { user } = useUser();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="flex w-full justify-center px-4 py-6">
      <div className="relative z-10 flex w-full max-w-3xl items-center justify-between rounded-full bg-white px-6 py-3 shadow-lg">
        <nav className="hidden items-center space-x-8 md:flex">
          {NAV_LINKS.map((link) => {
            const protectedLink = link.href === "/examination"; // Home is public; others require sign-in
            return (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                {user || !protectedLink ? (
                  <a
                    href={link.href}
                    className="font-medium text-gray-900 text-sm transition-colors hover:text-gray-600"
                  >
                    {link.name}
                  </a>
                ) : (
                  <SignInButton mode="modal">
                    <button
                      type="button"
                      title="Sign in to access"
                      className="font-medium text-gray-900 text-sm transition-colors hover:text-gray-600"
                    >
                      {link.name}
                    </button>
                  </SignInButton>
                )}
              </motion.div>
            );
          })}
        </nav>

        <motion.div
          className="hidden items-center md:flex"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          {user ? (
            <UserButton />
          ) : (
            <SignInButton mode="modal">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-gray-800"
              >
                Get Started
              </button>
            </SignInButton>
          )}
        </motion.div>

        <motion.button
          className="flex items-center md:hidden"
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
        >
          <Menu className="h-6 w-6 text-gray-900" />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-white px-6 pt-24 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <motion.button
              className="absolute top-6 right-6 p-2"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X className="h-6 w-6 text-gray-900" />
            </motion.button>

            <div className="flex flex-col space-y-6">
              {NAV_LINKS.map((link, i) => {
                const protectedLink = link.href !== "/"; // Home is public; others require sign-in
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    {user || !protectedLink ? (
                      <a
                        href={link.href}
                        className="font-medium text-base text-gray-900"
                        onClick={toggleMenu}
                      >
                        {link.name}
                      </a>
                    ) : (
                      <SignInButton mode="modal">
                        <button
                          type="button"
                          className="font-medium text-base text-gray-900"
                          onClick={toggleMenu}
                          title="Sign in to access"
                        >
                          {link.name}
                        </button>
                      </SignInButton>
                    )}
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0, y: 20 }}
                className="pt-6"
              >
                {user ? (
                  <UserButton afterSignOutUrl="/" />
                ) : (
                  <SignInButton mode="modal">
                    <button
                      type="button"
                      className="inline-flex w-full items-center justify-center rounded-full bg-black px-5 py-3 text-base text-white transition-colors hover:bg-gray-800"
                      onClick={toggleMenu}
                    >
                      Get Started
                    </button>
                  </SignInButton>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { Navbar1 };
