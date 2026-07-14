# Exercise 1: Validate and summarise applications

## Task

Implement `summariseApplications`. Each application must have a non-empty `id`, a valid status, and a valid ISO date. Duplicate IDs and invalid records must be reported rather than silently accepted. Return counts by status and the valid records newest first. Do not mutate the input.

```ts
type Status = "submitted" | "in_review" | "approved" | "rejected";

type RawApplication = {
  id?: unknown;
  status?: unknown;
  submittedAt?: unknown;
};
```

Try this before reading the solution. Discuss complexity, validation, personal-data logging, and the tests you would add.

## Model solution

```ts
type Status = "submitted" | "in_review" | "approved" | "rejected";
type RawApplication = { id?: unknown; status?: unknown; submittedAt?: unknown };
type Application = { id: string; status: Status; submittedAt: string };

type Summary = {
  counts: Record<Status, number>;
  applications: Application[];
  errors: { index: number; reason: string }[];
};

const statuses: readonly Status[] = [
  "submitted", "in_review", "approved", "rejected",
];

export function summariseApplications(input: RawApplication[]): Summary {
  const counts: Record<Status, number> = {
    submitted: 0, in_review: 0, approved: 0, rejected: 0,
  };
  const applications: Application[] = [];
  const errors: Summary["errors"] = [];
  const seenIds = new Set<string>();

  input.forEach((item, index) => {
    // Validate at the system boundary instead of trusting external data.
    if (typeof item.id !== "string" || item.id.trim() === "") {
      errors.push({ index, reason: "id must be a non-empty string" });
      return;
    }
    const id = item.id.trim();
    if (seenIds.has(id)) {
      errors.push({ index, reason: "duplicate id" });
      return;
    }
    if (typeof item.status !== "string" || !statuses.includes(item.status as Status)) {
      errors.push({ index, reason: "unknown status" });
      return;
    }
    if (typeof item.submittedAt !== "string" || Number.isNaN(Date.parse(item.submittedAt))) {
      errors.push({ index, reason: "invalid submittedAt" });
      return;
    }

    const application: Application = {
      id,
      status: item.status as Status,
      submittedAt: item.submittedAt,
    };
    seenIds.add(id);
    counts[application.status] += 1;
    applications.push(application);
  });

  // Sort our new array, never the caller's input.
  applications.sort((a, b) => Date.parse(b.submittedAt) - Date.parse(a.submittedAt));
  return { counts, applications, errors };
}
```

## Tests to describe or write

- Empty input returns zero counts and empty arrays.
- All four statuses are counted correctly.
- Blank ID, unknown status, and impossible date are rejected.
- Duplicate IDs are reported and not double-counted.
- Equal dates behave predictably (consider a secondary sort by ID).
- Original input and its order remain unchanged.

## What the panel is listening for

- Complexity is `O(n log n)` because of sorting; validation itself is `O(n)`.
- A schema library such as Zod could centralise runtime validation in a real service.
- Do not log full applications or personal data. Log a correlation ID and safe error category.
- Clarify whether partial success is acceptable; some services should reject the entire batch atomically.
