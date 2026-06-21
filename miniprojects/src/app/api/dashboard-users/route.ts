import { NextResponse } from "next/server";

const users = [
  { id: 1, name: "Maya Chen", email: "maya.chen@northstar.io", department: "Design", role: "Product Designer", status: "Active", initials: "MC", color: "coral" },
  { id: 2, name: "Liam Patel", email: "liam.patel@northstar.io", department: "Engineering", role: "Frontend Engineer", status: "Active", initials: "LP", color: "violet" },
  { id: 3, name: "Sofia Reyes", email: "sofia.reyes@northstar.io", department: "Marketing", role: "Growth Lead", status: "Away", initials: "SR", color: "amber" },
  { id: 4, name: "Noah Williams", email: "noah.williams@northstar.io", department: "Engineering", role: "Backend Engineer", status: "Active", initials: "NW", color: "blue" },
  { id: 5, name: "Amara Okafor", email: "amara.okafor@northstar.io", department: "People", role: "People Partner", status: "Active", initials: "AO", color: "green" },
  { id: 6, name: "Theo Martin", email: "theo.martin@northstar.io", department: "Sales", role: "Account Executive", status: "Offline", initials: "TM", color: "pink" },
  { id: 7, name: "Elena Rossi", email: "elena.rossi@northstar.io", department: "Finance", role: "Finance Analyst", status: "Active", initials: "ER", color: "cyan" },
  { id: 8, name: "Marcus Johnson", email: "marcus.johnson@northstar.io", department: "Design", role: "UX Researcher", status: "Away", initials: "MJ", color: "orange" },
] as const;

export async function GET() {
  // A short delay makes the loading state visible in this sample.
  await new Promise((resolve) => setTimeout(resolve, 650));

  return NextResponse.json({ users });
}
