# Home Office Developer Interview Practice Pack

This pack is tailored to campaign **464434 - Developer** and the six SFIA Level 3 skills named in the interview email:

- Software design (SWDN)
- Programming/software development (PROG)
- Testing (TEST)
- Systems integration and build (SINT)
- Data management (DATM)
- Application support (ASUP)

The real exercise may use a different language or format. The important part is showing a safe, structured approach, explaining trade-offs, and checking your work.

## How to practise

For each exercise:

1. Spend 2-3 minutes clarifying requirements and stating assumptions.
2. Think aloud while you work. The panel cannot score reasoning they cannot hear.
3. First make the happy path work, then cover validation, errors, security, and tests.
4. Explain what you would improve with more time.
5. Compare your response with the model solution only after attempting it.

Suggested timings:

- 30 minutes: coding/debugging task
- 10 minutes: tests and edge cases
- 5 minutes: design, security, deployment, and support discussion

## Exercises

1. [Validate and summarise applications](./01-application-summary.md) - TypeScript, validation, data handling
2. [Build an application-status API](./02-status-api.md) - API design, security, tests
3. [Test a React status component](./03-react-testing.md) - React and Testing Library
4. [Debug a production incident](./04-production-debugging.md) - support and troubleshooting
5. [Review a CI/CD pipeline](./05-cicd-review.md) - integration, build, Docker/Kubernetes/AWS
6. [Design a scalable case service](./06-system-design.md) - software design and data management
7. [Technical and experience questions](./07-interview-questions.md) - model answer frameworks
8. [Interview-day checklist](./08-interview-checklist.md) - concise reminders

## A strong opening for an unseen exercise

> I will first restate the problem and clarify the expected input, output, constraints, and error behaviour. I will implement the smallest correct solution, narrate the trade-offs, and then add tests for normal, boundary, and failure cases. I will also call out security, accessibility, observability, and deployment considerations where relevant.

Do not memorise model answers word-for-word. Adapt them to work you genuinely performed; the panel will ask follow-up questions.
