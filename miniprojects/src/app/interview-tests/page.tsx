import Link from "next/link";

const projects = [
  {
    href: "/interview-tests/application-summary",
    title: "Application summary",
    skills: "Programming · Data management",
    description: "Typed application data, immutable filtering, sorting, and accessible tables.",
  },
  {
    href: "/interview-tests/status-lookup",
    title: "Status lookup",
    skills: "Software design · Testing · Security",
    description: "Validated input, asynchronous states, accessible feedback, and safe errors.",
  },
  {
    href: "/interview-tests/incident-simulator",
    title: "Incident simulator",
    skills: "Application support · Integration",
    description: "A structured response to a production failure after deployment.",
  },
  {
    href: "/interview-tests/system-design",
    title: "System design",
    skills: "Software design · Data management",
    description: "A secure, scalable, reliable, and auditable case-status service.",
  },
];

export default function InterviewProjectsPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="font-semibold text-blue-700 hover:underline">← Back to home</Link>
        <header className="mt-6 rounded-3xl bg-slate-950 p-8 sm:p-10">
          <p className="font-semibold uppercase tracking-wider !text-cyan-300">Home Office interview practice</p>
          <h1 className="mt-3 text-4xl font-black !text-white sm:text-5xl">Choose a technical project</h1>
          <p className="mt-4 max-w-3xl text-lg !text-slate-300">
            Every sample is now an independent Next.js route with its own page, components, and data.
          </p>
        </header>

        <nav aria-label="Interview practice projects" className="mt-8 grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <Link key={project.href} href={project.href}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <p className="text-sm font-bold uppercase tracking-wider text-blue-700">Project {index + 1}</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950 group-hover:text-blue-800">{project.title}</h2>
              <p className="mt-2 text-sm font-semibold text-slate-500">{project.skills}</p>
              <p className="mt-4 leading-6 text-slate-600">{project.description}</p>
              <span className="mt-5 inline-block font-bold text-blue-700">Open project →</span>
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
