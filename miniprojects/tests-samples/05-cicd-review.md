# Exercise 5: Review a CI/CD pipeline

## Scenario

A pull request pipeline installs dependencies, builds a Docker image as `latest`, pushes it, and deploys directly to production. What would you change?

## Model review

- Pin the runtime and use a lockfile with a reproducible install (`npm ci`).
- Run formatting/linting, type checks, unit and integration tests, and accessibility checks.
- Scan dependencies, secrets, source, and container images; produce an SBOM where required.
- Build once and promote the same immutable image by commit SHA/digest through environments.
- Keep credentials in a managed secret store; use short-lived identity and least privilege.
- Require review and protected branches; production should have an approval/control appropriate to risk.
- Run database changes backward-compatibly and define rollback or roll-forward steps.
- Deploy gradually, run smoke/health checks, observe service-level metrics, and automate rollback on failure.
- Keep an auditable record of who approved and what artifact was deployed.

## Example pipeline sketch

```yaml
steps:
  - checkout
  - setup-node: { version: 22, cache: npm }
  - run: npm ci
  - run: npm run lint
  - run: npm run typecheck
  - run: npm test -- --coverage
  - run: npm run build
  - run: security-and-secret-scans
  - build-image: { tag: "service:${COMMIT_SHA}" }
  - scan-image
  - push-image
  - deploy-to-test
  - run-smoke-and-integration-tests
  - production-approval
  - promote-same-image-by-digest
  - verify-health-and-observability
```

## Follow-up questions

**Why not use `latest`?** It is mutable and does not prove which source revision is running, making audit and rollback harder.

**Unit tests passed; why integration tests?** Unit tests isolate code and can miss broken database, message, API, configuration, or network contracts.

**What is a safe rollback?** Restore the last known-good immutable artifact, but only if data/schema changes remain compatible. Otherwise use a tested roll-forward or feature flag.

**How does Kubernetes help?** It can provide declarative deployments, readiness/liveness checks, scaling, rolling updates, resource limits, and self-healing. It does not remove the need for secure configuration and observability.
