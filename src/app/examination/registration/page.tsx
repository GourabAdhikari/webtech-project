"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// ✅ Define strong type for form data
interface FormData {
  name: string;
  rollNumber: string;
  registrationNumber: string;
  email: string;
  phone: string;
  guardianPhone: string;
  course: string;
  branch: string;
  semester: string;
  subjects: string[];
  examType: string;
  examSession: string;
  declaration: boolean;
}

export default function ExamRegistrationPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    rollNumber: "",
    registrationNumber: "",
    email: "",
    phone: "",
    guardianPhone: "",
    course: "",
    branch: "",
    semester: "",
    subjects: [],
    examType: "",
    examSession: "",
    declaration: false,
  });

  const [error, setError] = useState("");

  // ✅ Redirect protection
  useEffect(() => {
    const auth = sessionStorage.getItem("exam_auth");
    if (!auth) router.push("/examination");
  }, [router]);

  // ✅ Handle input changes (Type-safe fix)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked =
      e.target instanceof HTMLInputElement ? e.target.checked : false;

    setFormData({
      ...formData,
      [name]: type === "checkbox" && name !== "declaration" ? checked : value,
    });
  };

  // ✅ Toggle subject selection
  const toggleSubject = (subject: string) => {
    setFormData((prev) => {
      const isSelected = prev.subjects.includes(subject);
      return {
        ...prev,
        subjects: isSelected
          ? prev.subjects.filter((s) => s !== subject)
          : [...prev.subjects, subject],
      };
    });
  };

  // ✅ Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.rollNumber ||
      !formData.registrationNumber ||
      !formData.email ||
      !formData.phone ||
      !formData.guardianPhone ||
      !formData.course ||
      !formData.branch ||
      !formData.semester ||
      !formData.examType ||
      !formData.examSession ||
      formData.subjects.length === 0
    ) {
      setError(
        "Please fill in all required fields and select at least one subject.",
      );
      return;
    }

    if (!formData.declaration) {
      setError("You must accept the declaration before submitting.");
      return;
    }

    setError("");
    alert("Exam Registration submitted successfully!");
    router.push("/examination/main");
  };

  const availableSubjects = [
    "Mathematics",
    "Computer Networks",
    "Operating Systems",
    "Database Management",
    "Software Engineering",
    "Machine Learning",
    "Data Structures",
    "Artificial Intelligence",
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-white px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-2xl"
      >
        <Card className="border-none shadow-none">
          <CardContent className="p-10 md:p-14">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="font-extrabold text-3xl text-gray-900">
                Exam Registration Form
              </h1>
              <p className="mt-2 text-gray-600 text-sm md:text-base">
                Please fill in all details carefully before submission
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Full Name */}
              <LabelInputContainer>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </LabelInputContainer>

              {/* Roll + Registration */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <LabelInputContainer>
                  <Label htmlFor="rollNumber">Roll Number</Label>
                  <Input
                    id="rollNumber"
                    type="number"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    placeholder="Enter your roll number"
                    required
                  />
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor="registrationNumber">
                    Registration Number
                  </Label>
                  <Input
                    id="registrationNumber"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    placeholder="Enter registration number"
                    required
                  />
                </LabelInputContainer>
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <LabelInputContainer>
                  <Label htmlFor="email">Email ID</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="student@example.com"
                    required
                  />
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor="phone">Student’s Mobile Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    required
                  />
                </LabelInputContainer>
              </div>

              {/* Guardian's Mobile */}
              <LabelInputContainer>
                <Label htmlFor="guardianPhone">Guardian’s Mobile Number</Label>
                <Input
                  id="guardianPhone"
                  name="guardianPhone"
                  type="tel"
                  value={formData.guardianPhone}
                  onChange={handleChange}
                  placeholder="Enter guardian’s mobile number"
                  required
                />
              </LabelInputContainer>

              {/* Course + Branch */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <LabelInputContainer>
                  <Label htmlFor="course">Course</Label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 text-black text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    required
                  >
                    <option value="">Select Course</option>
                    <option>B.Tech</option>
                    <option>M.Tech</option>
                    <option>BCA</option>
                    <option>MCA</option>
                  </select>
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor="branch">Branch</Label>
                  <select
                    id="branch"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className="h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 text-black text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    required
                  >
                    <option value="">Select Branch</option>
                    <option>Computer Science</option>
                    <option>Electronics</option>
                    <option>Mechanical</option>
                    <option>Civil</option>
                  </select>
                </LabelInputContainer>
              </div>

              {/* Semester + Exam Type */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <LabelInputContainer>
                  <Label htmlFor="semester">Semester</Label>
                  <select
                    id="semester"
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    className="h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 text-black text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    required
                  >
                    <option value="">Select Semester</option>
                    {[...Array(8)].map((_, i) => (
                      <option key={`sem-${i + 1}`}>{i + 1} Semester</option>
                    ))}
                  </select>
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor="examType">Exam Type</Label>
                  <select
                    id="examType"
                    name="examType"
                    value={formData.examType}
                    onChange={handleChange}
                    className="h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 text-black text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    required
                  >
                    <option value="">Select Type</option>
                    <option>Regular</option>
                    <option>Backlog</option>
                    <option>Supplementary</option>
                  </select>
                </LabelInputContainer>
              </div>

              {/* Subjects */}
              <LabelInputContainer>
                <Label>Subjects</Label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {availableSubjects.map((subject) => (
                    <label
                      key={subject}
                      className="flex cursor-pointer items-center space-x-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 transition hover:bg-blue-50"
                    >
                      <input
                        type="checkbox"
                        checked={formData.subjects.includes(subject)}
                        onChange={() => toggleSubject(subject)}
                        className="accent-blue-600"
                      />
                      <span className="text-gray-700 text-sm">{subject}</span>
                    </label>
                  ))}
                </div>
              </LabelInputContainer>

              {/* Exam Session */}
              <LabelInputContainer>
                <Label htmlFor="examSession">Exam Session</Label>
                <select
                  id="examSession"
                  name="examSession"
                  value={formData.examSession}
                  onChange={handleChange}
                  className="h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 text-black text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  required
                >
                  <option value="">Select Session</option>
                  <option>May 2025</option>
                  <option>Nov 2025</option>
                  <option>May 2026</option>
                </select>
              </LabelInputContainer>

              {/* Declaration */}
              <div className="flex items-start space-x-3 pt-3">
                <input
                  type="checkbox"
                  id="declaration"
                  name="declaration"
                  checked={formData.declaration}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      declaration: e.target.checked,
                    })
                  }
                  className="mt-1 h-4 w-4 accent-blue-600"
                  required
                />
                <Label
                  htmlFor="declaration"
                  className="text-gray-700 text-sm leading-relaxed"
                >
                  I hereby declare that all information provided above is true
                  and correct to the best of my knowledge.
                </Label>
              </div>

              {error && (
                <div className="text-center text-red-600 text-sm">{error}</div>
              )}

              {/* Submit Button */}
              <button type="submit" className="uiverse-btn mx-auto">
                <div className="svg-wrapper-1">
                  <div className="svg-wrapper">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      role="img"
                      aria-labelledby="submitIconTitle"
                    >
                      <title id="submitIconTitle">Submit Icon</title>
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        fill="currentColor"
                        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                      />
                    </svg>
                  </div>
                </div>
                <span>Submit Registration</span>
              </button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);
