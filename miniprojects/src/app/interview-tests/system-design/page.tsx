import Link from "next/link";
import { SystemDesign } from "./SystemDesign";

export default function SystemDesignPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Link href="/interview-tests" className="font-semibold text-blue-700 hover:underline">
          ← All interview projects
        </Link>
        <header className="my-8">
          <p className="font-semibold uppercase tracking-wider text-emerald-700">Project 4</p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">Case-status system design</h1>
          <p className="mt-3 max-w-3xl text-lg text-slate-600">
            Practise explaining architecture, security, data ownership, scalability, and technical trade-offs.
          </p>
        </header>
        <SystemDesign />
      </div>
    </main>
  );
}
