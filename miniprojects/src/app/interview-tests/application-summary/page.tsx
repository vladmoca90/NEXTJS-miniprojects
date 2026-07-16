import Link from "next/link";
import { ApplicationSummary } from "./ApplicationSummary";

export default function ApplicationSummaryPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Link href="/interview-tests" className="font-semibold text-blue-700 hover:underline">
          ← All interview projects
        </Link>
        <header className="my-8">
          <p className="font-semibold uppercase tracking-wider text-blue-700">Project 1</p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">Application summary</h1>
          <p className="mt-3 max-w-3xl text-lg text-slate-600">
            Practise typed data transformation, immutable sorting, filtering, and accessible table markup.
          </p>
        </header>
        <ApplicationSummary />
      </div>
    </main>
  );
}
