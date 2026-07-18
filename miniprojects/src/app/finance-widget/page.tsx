"use client";
import "../styles/finance-widget.css";
import { Provider } from "react-redux";
import { FinanceWidgetComponent } from "./FinanceWidgetComponent";
import { store } from "./store/store";

export default function Page() {
  return (
    <main>
      <Provider store={store}>
        <FinanceWidgetComponent />
      </Provider>
    </main>
  );
}
