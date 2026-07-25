"use client";
import { Provider } from "react-redux";
import { MathGameComponent } from "./math-game/MathGameComponent";
import { store } from "./actors/store/store";

export default function MathGamePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Provider store={store}>
        <MathGameComponent />
      </Provider>
    </main>
  );
}
