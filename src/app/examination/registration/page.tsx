"use client";

import { useMutation, useQuery } from "convex/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/../convex/_generated/api";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

const subjectOptions = [
  { value: "mathematics", label: "Mathematics" },
  { value: "operating_systems", label: "Operating Systems" },
  { value: "dbms", label: "Database Management" },
  { value: "software_engineering", label: "Software Engineering" },
  { value: "machine_learning", label: "Machine Learning" },
  { value: "data_structures", label: "Data Structures" },
  { value: "artificial_intelligence", label: "Artificial Intelligence" },
] as const;

type Subject = (typeof subjectOptions)[number]["value"];

interface FormData {
  name: string;
  rollNumber: string;
  registrationNumber: string;
  email: string;
  phone: string;
  guardianPhone: string;
  course: "btech" | "mtech" | "mca" | "bca";
  branch: "cs" | "electronics" | "mechanical" | "civil";
  semester: number;
  subjects: Subject[];
  examType: "regular" | "supplementary" | "backlog";
  examSession: "may_2025" | "nov_2025" | "may_2026";
  declaration: boolean;
}

export default function ExamRegistrationPage() {
  const router = useRouter();
  const [rollNumber, setRollNumber] = useState<string | null>(null);
  const addExamMutation = useMutation(api.exams.insertExam);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    rollNumber: "",
    registrationNumber: "",
    email: "",
    phone: "",
    guardianPhone: "",
    course: "btech",
    branch: "cs",
    semester: 0,
    subjects: [],
    examType: "regular",
    examSession: "may_2025",
    declaration: false,
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("exam_auth");
    const rn = sessionStorage.getItem("exam_roll");
    setRollNumber(rn);
    if (!auth) router.push("/examination");
  }, [router]);

  const student = useQuery(
    api.students.getByRollNo,
    rollNumber ? { rollNo: rollNumber } : "skip",
  );

  useEffect(() => {
    if (student) {
      setFormData((prev) => ({
        ...prev,
        name: student.fullName ?? prev.name,
        rollNumber: student.rollNo ?? prev.rollNumber,
        registrationNumber:
          student.registrationNumber ?? prev.registrationNumber,
        email: student.email ?? prev.email,
        phone: student.studentMobile ?? prev.phone,
        guardianPhone: student.guardianMobile ?? prev.guardianPhone,
        course: student.course ?? prev.course,
        branch: student.branch ?? prev.branch,
        semester: student.semester ?? prev.semester,
      }));
    }
  }, [student]);

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

  const toggleSubject = (subject: Subject) => {
    setFormData((prev) => {
      const exists = prev.subjects.includes(subject);
      return {
        ...prev,
        subjects: exists
          ? prev.subjects.filter((s) => s !== subject)
          : [...prev.subjects, subject],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!student) {
      setError("Student data not loaded. Please try again.");
      return;
    }

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
    setIsSubmitting(true);
    try {
      await addExamMutation({
        studentId: student._id,
        examType: formData.examType,
        subjects: formData.subjects,
        session: formData.examSession,
      });
      alert("Exam Registration submitted successfully!");
      router.push("/examination/main");
    } catch (err: unknown) {
      console.error("Failed to submit exam registration:", err);
      setError(
        err && typeof err === "object" && "message" in err
          ? (err as Error).message
          : "Failed to submit registration. Please try again.",
      );
      setIsSubmitting(false);
    }
  };

  if (student === undefined) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

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
            <div className="mb-8 text-center">
              <h1 className="font-extrabold text-3xl text-gray-900">
                Exam Registration Form
              </h1>
              <p className="mt-2 text-gray-600 text-sm md:text-base">
                Please fill in all details carefully before submission
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              <LabelInputContainer>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  disabled={!!student}
                />
              </LabelInputContainer>

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
                    disabled={!!student}
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
                    disabled={!!student}
                  />
                </LabelInputContainer>
              </div>

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
                    disabled={!!student}
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
                    disabled={!!student}
                  />
                </LabelInputContainer>
              </div>

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
                  disabled={!!student}
                />
              </LabelInputContainer>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <LabelInputContainer>
                  <Label htmlFor="course">Course</Label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 text-black text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:bg-gray-100 disabled:text-gray-500"
                    required
                    disabled={!!student}
                  >
                    <option value="">Select Course</option>
                    <option value="btech">B.Tech</option>
                    <option value="mtech">M.Tech</option>
                    <option value="bca">BCA</option>
                    <option value="mca">MCA</option>
                  </select>
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor="branch">Branch</Label>
                  <select
                    id="branch"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className="h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 text-black text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:bg-gray-100 disabled:text-gray-500"
                    required
                    disabled={!!student}
                  >
                    <option value="">Select Branch</option>
                    <option value="cs">Computer Science</option>
                    <option value="electronics">Electronics</option>
                    <option value="mechanical">Mechanical</option>
                    <option value="civil">Civil</option>
                  </select>
                </LabelInputContainer>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <LabelInputContainer>
                  <Label htmlFor="semester">Semester</Label>
                  <select
                    id="semester"
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    className="h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 text-black text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:bg-gray-100 disabled:text-gray-500"
                    required
                    disabled={!!student}
                  >
                    <option value="">Select Semester</option>
                    {[...Array(8)].map((_, i) => (
                      <option key={`sem-${i + 1}`} value={i + 1}>
                        Semester {i + 1}
                      </option>
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
                    <option value="regular">Regular</option>
                    <option value="backlog">Backlog</option>
                    <option value="supplementary">Supplementary</option>
                  </select>
                </LabelInputContainer>
              </div>

              <LabelInputContainer>
                <Label>Subjects</Label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {subjectOptions.map((s) => (
                    <label
                      key={s.value}
                      className="flex cursor-pointer items-center space-x-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 transition hover:bg-blue-50"
                    >
                      <input
                        type="checkbox"
                        checked={formData.subjects.includes(s.value)}
                        onChange={() => toggleSubject(s.value)}
                        className="accent-blue-600"
                      />
                      <span className="text-gray-700 text-sm">{s.label}</span>
                    </label>
                  ))}
                </div>
              </LabelInputContainer>

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
                  <option value="may_2025">May 2025</option>
                  <option value="nov_2025">Nov 2025</option>
                  <option value="may_2026">May 2026</option>
                </select>
              </LabelInputContainer>

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

              <button
                type="submit"
                className="uiverse-btn mx-auto"
                disabled={isSubmitting}
              >
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
