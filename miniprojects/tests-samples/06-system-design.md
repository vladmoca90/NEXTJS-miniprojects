# Exercise 6: Design a scalable case-status service

## Task

Design a service that lets authenticated users view an application status and lets authorised staff update it. It must be secure, reliable, accessible, and auditable.

## Clarifying questions

- Expected users, read/write volume, latency, availability, and retention?
- Is status strongly consistent immediately after an update?
- Which systems own identity and application data?
- What personal data exists and what audit/legal obligations apply?
- Are notifications required, and can they be eventually consistent?

## Proposed design

```text
Accessible React/Next.js UI
        |
API gateway / authentication / rate limiting
        |
Status service (Node.js or Python)
        |----------------------|
Primary data store         Event/message queue
        |                      |
Audit history             Notification worker
```

- Keep the API stateless so instances can scale horizontally.
- Enforce role/ownership authorisation inside the service, not only in the UI.
- Store a status code, version, and timestamps; keep append-only audit events for changes.
- Use optimistic concurrency (version/ETag) to prevent staff overwriting each other's updates.
- Publish notification events using an outbox pattern so a database update cannot succeed while its event is lost.
- Make consumers idempotent because messages may be delivered more than once.
- Encrypt in transit and at rest, minimise retained data, redact logs, and apply least privilege.
- Use timeouts, bounded retries with backoff/jitter, circuit breaking where appropriate, and dead-letter handling.
- Monitor latency, traffic, errors, saturation, queue depth, and user-journey success.
- Test accessibility against WCAG and use progressive enhancement for critical journeys.

## Data example

```ts
type ApplicationStatusRecord = {
  applicationId: string;
  ownerId: string;
  status: "submitted" | "in_review" | "approved" | "rejected";
  version: number;        // optimistic concurrency
  updatedAt: string;
  updatedBy: string;      // protected audit field; not returned publicly
};
```

## Trade-offs to explain

- A relational database is a straightforward default for constraints, transactions, and audit relationships. MongoDB may suit document-shaped application data; justify it from access patterns, not fashion.
- Elasticsearch is useful as a derived search index, not normally the authoritative status store.
- Begin with the simplest service that meets evidence-based scale needs. Splitting into microservices adds deployment and operational cost.
- Availability must not weaken authorisation or correctness. Degraded modes should be explicit and safe.
