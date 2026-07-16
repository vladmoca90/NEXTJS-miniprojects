import Link from "next/link";
import { StatusLookup } from "./StatusLookup";

export default function StatusLookupPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/interview-tests" className="font-semibold text-blue-700 hover:underline">
          ← All interview projects
        </Link>
        <header className="my-8">
          <p className="font-semibold uppercase tracking-wider text-cyan-700">Project 2</p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">Application status lookup</h1>
          <p className="mt-3 max-w-3xl text-lg text-slate-600">
            Practise form validation, asynchronous UI states, accessibility, and secure error behaviour.
          </p>
        </header>
        <StatusLookup />
      </div>
    </main>
  );
}
