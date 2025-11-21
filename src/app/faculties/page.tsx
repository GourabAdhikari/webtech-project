import type { Metadata } from "next";
import { Component } from "@/components/ui/testimonial";

export const metadata: Metadata = {
  title: "Faculties",
};

export default function FacultiesPage() {
  return (
    <div>
      <Component />
    </div>
  );
}
