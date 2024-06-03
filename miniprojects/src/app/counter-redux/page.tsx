"use client";
import "./styles/counter-redux.css";
import CounterComponent from "./CounterComponent";
import { Provider } from "react-redux";
import { store } from "./counter-redux/state/store";

export default function CounterMainComponent() {
    return (
        <div className="main">
            <Provider store={store}>
                <h1>Redux Counter Tutorial</h1>
                <CounterComponent />
            </Provider>
        </div>
    );
}