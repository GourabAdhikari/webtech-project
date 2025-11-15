"use client";

import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/../convex/_generated/api";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ExaminationLoginPage() {
  const router = useRouter();
  const [rollNumber, setRollNumber] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");

  const student = useQuery(
    api.students.getByRollNo,
    rollNumber.trim() ? { rollNo: rollNumber.trim() } : "skip",
  );

  const sha256 = async (input: string): Promise<string> => {
    const data = new TextEncoder().encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!rollNumber.trim() || !dob.trim()) {
      setError("Please enter both Roll Number and DOB.");
      return;
    }

    const dobRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!dobRegex.test(dob)) {
      setError("Please enter DOB as DD/MM/YYYY format only.");
      return;
    }

    if (student === undefined) {
      setError("Checking details...");
      return;
    }

    if (student === null) {
      setError("Invalid roll number.");
      return;
    }

    const hashedInput = await sha256(dob);

    if (hashedInput !== student.birthdateHash) {
      setError("Incorrect Date of Birth.");
      return;
    }

    // ✅ Save data to sessionStorage for later authentication
    sessionStorage.setItem("exam_auth", "true");
    sessionStorage.setItem("exam_roll", rollNumber.trim());
    sessionStorage.setItem("student_id", student._id);

    router.push("/examination/main");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl overflow-hidden rounded-3xl shadow-2xl"
      >
        <div className="flex flex-col md:flex-row">
          {/* 🎓 Left Section */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="flex items-center justify-center bg-gradient-to-b from-blue-600 to-blue-500 p-10 text-white md:w-1/2"
          >
            <div className="w-full max-w-md">
              <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-8 shadow-md">
                <Image
                  src="/images/GU_Digital_Logo.jpg"
                  alt="GU Digital Logo"
                  width={200}
                  height={200}
                  className="mb-4 h-auto w-48 rounded-md object-contain"
                  priority
                />
                <p className="text-center font-medium text-gray-600 text-sm">
                  Gauhati University — IT Department
                </p>
              </div>

              <div className="mt-8 rounded-xl bg-blue-700 p-5 text-center">
                <h1 className="font-bold text-3xl">Student Login</h1>
              </div>
            </div>
          </motion.div>

          {/* 🧾 Right Section */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="flex items-center justify-center bg-white p-10 md:w-1/2"
          >
            <div className="w-full max-w-lg">
              <Card className="shadow-none">
                <CardContent className="p-8">
                  <div className="mb-6 text-center">
                    <h2 className="font-bold text-2xl text-blue-700 md:text-3xl">
                      Sign in
                    </h2>
                    <p className="mt-2 text-gray-500 text-sm">
                      Enter Roll Number and Date of Birth to continue
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <Label htmlFor="roll" className="text-gray-700">
                        Roll Number
                      </Label>
                      <Input
                        id="roll"
                        type="number"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        placeholder="Enter your Roll Number"
                        required
                        className="py-3"
                      />
                    </div>

                    <div>
                      <Label htmlFor="dob" className="text-gray-700">
                        Date of Birth (used as password)
                      </Label>
                      <Input
                        id="dob"
                        type="text"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        placeholder="DD/MM/YYYY"
                        required
                        className="py-3"
                      />
                    </div>

                    {error && (
                      <div className="text-center text-red-600 text-sm">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="cssbuttons-io"
                      aria-label="Login"
                    >
                      <span>Login</span>
                    </button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
