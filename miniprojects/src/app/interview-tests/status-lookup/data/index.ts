export type LookupState = { kind: "idle" | "loading" } | { kind: "success"; reference: string; status: string } | { kind: "error"; message: string };
export const referencePattern = /^HO-\d{4}$/;
export const knownApplications: Record<string, string> = {
  "HO-1042": "In review", "HO-1043": "Submitted", "HO-1038": "Approved",
};
