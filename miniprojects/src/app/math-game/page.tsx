"use client";
import "./styles/math-game.css";
import { Provider } from "react-redux";
import { MathGameComponent } from "./MathGameComponent";
import { store } from "./store/store";

export default function Page() {
  return (
    <main>
      <Provider store={store}>
        <MathGameComponent  />
      </Provider>
    </main>
  );
}
