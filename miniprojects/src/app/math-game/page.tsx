"use client";
import "./styles/math-game.css";
import { Provider } from "react-redux";
import { MathGame } from "./MathGame";
import { store } from "./store/store";

export default function Page() {
  return (
    <main>
      <Provider store={store}>
        <MathGame />
      </Provider>
    </main>
  );
}
