"use client";

import "./styles/finance-widget.css";
import { Provider } from "react-redux";
import { FinanceWidget } from "./FinanceWidget";
import { store } from "./store/store";

export default function Page() {
  return (
    <main>
      <Provider store={store}>
        <FinanceWidget />
      </Provider>
    </main>
  );
}
