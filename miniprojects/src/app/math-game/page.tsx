"use client";
import "./styles/math-game.css";
import { Provider } from "react-redux";
import { MathGameComponent } from "./MathGameComponent";
import { store } from "./store/store";

export default function MathGamePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Provider store={store}>
        <MathGameComponent />
      </Provider>
    </main>
  );
}
