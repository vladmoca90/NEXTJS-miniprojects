import type { Metadata } from "next";
import Dashboard from "./dashboard/Dashboard";

export const metadata: Metadata = {
  title: "Team dashboard | Northstar",
  description: "A responsive team directory dashboard sample.",
};

export default function DashboardPage() {
  return <Dashboard />;
}
