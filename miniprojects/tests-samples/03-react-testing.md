# Exercise 3: Test a React status component

## Task

Test a component which fetches `/api/applications/{id}` and displays loading, success, empty, and error states. It must be accessible.

## Example component

```tsx
export function ApplicationStatus({ id }: { id: string }) {
  const [state, setState] = React.useState<
    | { kind: "loading" }
    | { kind: "success"; status: string }
    | { kind: "error" }
  >({ kind: "loading" });

  React.useEffect(() => {
    const controller = new AbortController();
    setState({ kind: "loading" });

    fetch(`/api/applications/${encodeURIComponent(id)}`, { signal: controller.signal })
      .then(async response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(data => setState({ kind: "success", status: data.status }))
      .catch(error => {
        // An aborted request is expected during unmount or when the ID changes.
        if (error.name !== "AbortError") setState({ kind: "error" });
      });

    return () => controller.abort();
  }, [id]);

  if (state.kind === "loading") return <p role="status">Loading status…</p>;
  if (state.kind === "error") return <p role="alert">We could not load the status. Try again.</p>;
  return <p>Your application status is: <strong>{state.status}</strong></p>;
}
```

## Model tests

```tsx
import { render, screen } from "@testing-library/react";

afterEach(() => vi.restoreAllMocks());

it("shows loading and then the returned status", async () => {
  vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(JSON.stringify({ status: "in review" }), { status: 200 }),
  );
  render(<ApplicationStatus id="abc 123" />);
  expect(screen.getByRole("status")).toHaveTextContent(/loading/i);
  expect(await screen.findByText(/in review/i)).toBeVisible();
  expect(fetch).toHaveBeenCalledWith(
    "/api/applications/abc%20123",
    expect.objectContaining({ signal: expect.any(AbortSignal) }),
  );
});

it("announces an error", async () => {
  vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 500 }));
  render(<ApplicationStatus id="abc" />);
  expect(await screen.findByRole("alert")).toHaveTextContent(/try again/i);
});
```

## Testing tips

- Test behaviour visible to the user, not implementation details or internal state.
- Prefer accessible queries such as role, label, and visible text.
- Mention unit, integration, contract, end-to-end, accessibility, and performance tests, but choose the cheapest layer that gives confidence.
- For TDD: state “red, green, refactor”; write one failing behavioural test, make it pass minimally, then improve the design.
- Add tests for changed `id`, malformed JSON, slow responses, unmount/abort, and status text supplied by the API.
