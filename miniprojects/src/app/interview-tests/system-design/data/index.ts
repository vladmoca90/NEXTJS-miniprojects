export type DesignItem = { name: string; note: string };
export const designItems: DesignItem[] = [
  { name: "Accessible Next.js UI", note: "Semantic HTML, keyboard support, clear errors" },
  { name: "API gateway", note: "Authentication, rate limiting, request IDs" },
  { name: "Status service", note: "Server-side authorisation and validation" },
  { name: "Primary data store", note: "Transactions, versioning, audit history" },
  { name: "Event worker", note: "Idempotent notifications and outbox pattern" },
];
