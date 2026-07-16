export type ApplicationStatus = "submitted" | "in_review" | "approved" | "rejected";
export type Application = { id: string; applicant: string; status: ApplicationStatus; submittedAt: string };
export type ApplicationFilter = ApplicationStatus | "all";

export const applications: Application[] = [
  { id: "HO-1042", applicant: "Sam Taylor", status: "in_review", submittedAt: "2026-07-12" },
  { id: "HO-1043", applicant: "Alex Morgan", status: "submitted", submittedAt: "2026-07-14" },
  { id: "HO-1038", applicant: "Jordan Singh", status: "approved", submittedAt: "2026-07-08" },
  { id: "HO-1039", applicant: "Charlie Jones", status: "rejected", submittedAt: "2026-07-09" },
];

export const filters: ApplicationFilter[] = ["all", "submitted", "in_review", "approved", "rejected"];
export const statusStyles: Record<ApplicationStatus, string> = {
  submitted: "bg-blue-100 text-blue-900",
  in_review: "bg-amber-100 text-amber-900",
  approved: "bg-emerald-100 text-emerald-900",
  rejected: "bg-rose-100 text-rose-900",
};
