"use client";

import type { Metadata } from "next";
import Image from "next/image";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

export const metadata: Metadata = {
  title: "Courses",
};

export default function CoursesPage() {
  const courseContent = [
    {
      title: (
        <span className="font-bold text-black">
          1. B.Tech in Information Technology
        </span>
      ),
      description: (
        <div className="space-y-3 text-black">
          <p>
            A 4-year engineering program focused on software development, data
            management, computer networking, and information security.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Outcomes:</strong> Graduates can design, develop, secure,
              and manage complex IT systems and software solutions.
            </li>
            <li>
              <strong>Duration:</strong> 4 Years (8 Semesters)
            </li>
            <li>
              <strong>Total Seats:</strong> 60
            </li>
            <li>
              <strong>Course Structure:</strong> Core IT, Programming (Python,
              Java), Database Management, Web Technologies, AI, and
              Cybersecurity.
            </li>
          </ul>
        </div>
      ),
      content: (
        <Image
          src="/images/courses/pimg1.png"
          alt="B.Tech IT"
          width={400}
          height={400}
          className="h-full w-full object-cover"
        />
      ),
    },
    {
      title: (
        <span className="font-bold text-black">
          2. B.Tech in Computer Science
        </span>
      ),
      description: (
        <div className="space-y-3 text-black">
          <p>
            A 4-year engineering program covering computation, algorithms, data
            structures, and software engineering.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Outcomes:</strong> Graduates gain deep skills in
              algorithms, computational theory, software engineering, and
              artificial intelligence.
            </li>
            <li>
              <strong>Duration:</strong> 4 Years (8 Semesters)
            </li>
            <li>
              <strong>Total Seats:</strong> 60
            </li>
            <li>
              <strong>Course Structure:</strong> Data Structures & Algorithms,
              Theory of Computation, Operating Systems, Compiler Design, and
              Machine Learning.
            </li>
          </ul>
        </div>
      ),
      content: (
        <Image
          src="/images/courses/pimg2.png"
          alt="B.Tech CSE"
          width={400}
          height={400}
          className="h-full w-full object-cover"
        />
      ),
    },
    {
      title: (
        <span className="font-bold text-black">
          3. M.Tech in Information Technology
        </span>
      ),
      description: (
        <div className="space-y-3 text-black">
          <p>
            An advanced, 2-year specialization program for B.Tech graduates to
            deepen their expertise in emerging IT fields.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Outcomes:</strong> Graduates can lead research, develop
              specialized applications, and manage high-level IT projects.
            </li>
            <li>
              <strong>Duration:</strong> 2 Years (4 Semesters)
            </li>
            <li>
              <strong>Total Seats:</strong> 18
            </li>
            <li>
              <strong>Course Structure:</strong> Advanced topics in Data
              Science, Cloud Computing, and Information Security, including a
              major thesis/project.
            </li>
          </ul>
        </div>
      ),
      content: (
        <Image
          src="/images/courses/pimg3.png"
          alt="M.Tech IT"
          width={400}
          height={400}
          className="h-full w-full object-cover"
        />
      ),
    },
    {
      title: (
        <span className="font-bold text-black">
          4. Master of Computer Applications (MCA)
        </span>
      ),
      description: (
        <div className="space-y-3 text-black">
          <p>
            A 2-year professional master's degree designed for advanced
            application development and software project management.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Outcomes:</strong> Graduates are proficient in advanced
              application development, system design, and software project
              management.
            </li>
            <li>
              <strong>Duration:</strong> 2 Years (4 Semesters)
            </li>
            <li>
              <strong>Total Seats:</strong> 40
            </li>
            <li>
              <strong>Course Structure:</strong> Application Development,
              Advanced DBMS, Software Engineering, Web/Mobile Technologies, and
              Final Semester Internship.
            </li>
          </ul>
        </div>
      ),
      content: (
        <Image
          src="/images/courses/pimg4.png"
          alt="MCA"
          width={400}
          height={400}
          className="h-full w-full object-cover"
        />
      ),
    },
    {
      title: (
        <span className="font-bold text-black">
          5. Bachelor of Computer Applications (BCA)
        </span>
      ),
      description: (
        <div className="space-y-3 text-black">
          <p>
            A 3-year undergraduate program focused on programming, software
            development, and web technologies.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Outcomes:</strong> Graduates are prepared for roles in
              software development, web design, database administration, and IT
              support.
            </li>
            <li>
              <strong>Duration:</strong> 3 Years (6 Semesters)
            </li>
            <li>
              <strong>Total Seats:</strong> 60
            </li>
            <li>
              <strong>Course Structure:</strong> C, C++, Java, Database Systems,
              Web Development, Data Structures, and Operating Systems.
            </li>
          </ul>
        </div>
      ),
      content: (
        <Image
          src="/images/courses/pimg5.png"
          alt="BCA"
          width={400}
          height={400}
          className="h-full w-full object-cover"
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="mb-8 text-center font-bold text-4xl text-gray-900">
        Academic Philosophy
      </h1>
      <p className="mb-10 text-center text-gray-600">
        We are dedicated to a robust curriculum built on Innovation,
        Application, and Ethics. Our goal is to balance strong theoretical
        knowledge with practical skills, empowering students to become critical
        thinkers and leaders in technology.
      </p>
      <h1 className="mb-8 text-center font-bold text-4xl text-gray-900">
        Courses
      </h1>
      <p className="mb-10 text-center text-gray-600">
        Here is a brief overview of the academic programs offered by the
        Department.
      </p>
      <StickyScroll content={courseContent} />
    </div>
  );
}
