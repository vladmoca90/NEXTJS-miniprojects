# Exercise 2: Build an application-status API

## Task

Sketch or implement `GET /applications/:id/status`. A user may only see their own application. Return useful HTTP responses without leaking whether another person's record exists.

## Model design

```ts
// Express-style example. Authentication middleware is assumed to have verified
// the token and populated req.user; never trust a user ID supplied in query data.
app.get("/applications/:id/status", requireAuth, async (req, res, next) => {
  try {
    const application = await repository.findById(req.params.id);

    // Return the same response for missing and unauthorised records to reduce
    // record-enumeration risk.
    if (!application || application.userId !== req.user.id) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Expose only fields required by the user, not the full database document.
    return res.status(200).json({
      id: application.id,
      status: application.status,
      updatedAt: application.updatedAt,
    });
  } catch (error) {
    // Central middleware can log a correlation ID and map unexpected failures.
    return next(error);
  }
});
```

## Tests

```ts
describe("GET /applications/:id/status", () => {
  it("returns the authenticated user's status", async () => {
    repository.findById.mockResolvedValue({
      id: "a1", userId: "u1", status: "in_review", updatedAt: "2026-07-01",
    });
    const response = await request(app).get("/applications/a1/status").set(authFor("u1"));
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: "a1", status: "in_review", updatedAt: "2026-07-01" });
  });

  it("returns 401 without valid authentication", async () => {
    expect((await request(app).get("/applications/a1/status")).status).toBe(401);
  });

  it("does not reveal another user's record", async () => {
    repository.findById.mockResolvedValue({ id: "a1", userId: "u2", status: "approved" });
    expect((await request(app).get("/applications/a1/status").set(authFor("u1"))).status).toBe(404);
  });
});
```

## Discussion points

- Validate the route parameter and use parameterised database queries.
- Authorisation is distinct from authentication.
- Use rate limiting, secure headers, TLS, dependency scanning, and least-privilege service credentials.
- Use structured logs, metrics for latency/error rate, tracing, health checks, and a correlation ID.
- Do not expose stack traces or sensitive database fields.
- Version the contract if breaking changes are required; document it with OpenAPI.
- Consider caching carefully because status data is user-specific and may be sensitive.
