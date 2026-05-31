"use client";
import "./styles/math-game.css";
import { Provider } from "react-redux";
import { MathGame } from "./math-game/MathGame";
import { store } from "./math-game/store/store";

export default function Page() {
  return (
    <main>
      <Provider store={store}>
        <MathGame />
      </Provider>
    </main>
  );
}
