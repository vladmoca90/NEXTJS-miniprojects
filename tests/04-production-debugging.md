# Exercise 4: Debug a production incident

## Scenario

After a deployment, some users see a blank status page. API `5xx` responses increased from 0.2% to 8%, but only for older applications. You have dashboard and log access. Explain your response.

## Strong answer

1. **Assess impact and protect users.** Confirm scope, severity, start time, affected journeys, and whether sensitive data or security is involved. Open an incident and communicate clearly.
2. **Stabilise.** If the release correlates strongly and rollback is safe, roll back or disable the feature using a flag. Do not make an unreviewed production edit.
3. **Use evidence.** Compare deployment time with metrics; inspect safe structured logs and traces using correlation IDs; compare a failing old record with a successful new record without exposing personal data.
4. **Form and test hypotheses.** A schema or status-enum change may not handle historical records. Reproduce in a production-like environment using sanitised representative data.
5. **Fix safely.** Add backward-compatible handling or migrate data, add a regression test, peer-review, run the pipeline, and deploy gradually.
6. **Verify and learn.** Confirm error rate, latency, and user journey recovery. Document the incident and hold a blameless review with actions, owners, and dates.

## Deliberately faulty code

```ts
function displayStatus(record: { status?: string }) {
  // Bug: old records can have no status, so toUpperCase throws.
  return record.status.toUpperCase();
}
```

## Safer fix

```ts
const knownStatuses = new Set(["submitted", "in_review", "approved", "rejected"]);

function displayStatus(record: { status?: unknown }): string {
  if (typeof record.status !== "string" || !knownStatuses.has(record.status)) {
    // In a real system, emit a safe metric for legacy/invalid records so the
    // underlying data can be corrected rather than hiding it indefinitely.
    return "Status unavailable";
  }
  return record.status.replaceAll("_", " ");
}
```

## Useful phrases

- “I would avoid jumping to a cause before correlating the evidence.”
- “My first priority is restoring a safe service; root-cause analysis follows.”
- “Logs must not contain application details or other personal data.”
- “I would keep stakeholders updated with impact, mitigation, and the next update time.”
