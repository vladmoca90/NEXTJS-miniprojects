"use client";
import "./styles/counter-redux.css";
import { Provider } from "react-redux";
import CounterComponent from "./CounterComponent";
import { store } from "./counter-redux/state/store";

export default function CounterReduxComponent() {
    return (
        <div className="main">
            <Provider store={store}>
                <h1>Redux Counter Tutorial</h1>
                <CounterComponent />
            </Provider>
        </div>
    );
}