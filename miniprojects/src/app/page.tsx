"use client";
import "./styles/math-game.css";
import { Provider } from "react-redux";
import { MathGameComponent } from "./math-game/MathGameComponent";
import { store } from "./math-game/store/store";

export default function Page() {
  return (
    <main>
      <Provider store={store}>
        <MathGameComponent  />
      </Provider>
    </main>
  );
}
