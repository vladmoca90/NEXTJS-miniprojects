"use client";
import "./styles/math-game.css";
import { Provider } from "react-redux";
import { MathGameComponent } from "./math-game/MathGameComponent";
import { store } from "./math-game/store/store";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <div className="bg-slate-950 px-4 py-3 text-center">
        <Link
          href="/interview-tests"
          className="inline-flex rounded-lg bg-cyan-300 px-4 py-2 font-bold text-slate-950 hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          Open Home Office interview samples
        </Link>
      </div>
      <Provider store={store}>
        <MathGameComponent  />
      </Provider>
    </main>
  );
}
