import Link from "next/link";
import { ApplicationSummary } from "./ApplicationSummary";
import { IncidentSimulator } from "./IncidentSimulator";
import { StatusLookup } from "./StatusLookup";
import { SystemDesign } from "./SystemDesign";

const skills = ["Software design", "Programming", "Testing", "Integration & build", "Data management", "Application support"];

export default function InterviewTestsPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="inline-flex rounded-md font-semibold text-blue-700 underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500">← Back to home</Link>

        <header className="mt-6 rounded-3xl bg-gradient-to-br from-blue-900 via-slate-900 to-cyan-900 p-7 shadow-xl sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] !text-cyan-300">Home Office developer practice</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight !text-white sm:text-5xl">Technical interview samples built with Next.js, TypeScript and Tailwind</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 !text-slate-200">Interactive examples covering the six SFIA Level 3 skills listed for campaign 464434.</p>
          <ul aria-label="Skills covered" className="mt-6 flex flex-wrap gap-2">
            {skills.map((skill) => <li key={skill} className="rounded-full border border-cyan-300/40 bg-cyan-200/10 px-3 py-1 text-sm font-medium !text-cyan-100">{skill}</li>)}
          </ul>
        </header>

        <div className="mt-8 grid gap-8">
          <ApplicationSummary />
          <StatusLookup />
          <IncidentSimulator />
          <SystemDesign />
        </div>
      </div>
    </main>
  );
}
