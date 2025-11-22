import type { Metadata } from "next";
import KanbanBoard from "@/components/events";

export const metadata: Metadata = {
  title: "Events",
};

export default function EventsPage() {
  return (
    <div>
      <KanbanBoard />
    </div>
  );
}
