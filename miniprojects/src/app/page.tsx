"use client";
import "./styles/counter-redux.css";
import { Provider } from "react-redux";
import CounterComponent from "./CounterComponent";
import { store } from "./counter-redux/state/store";

interface CounterState {
    value: number;
}

interface UserState {
    isSignedIn: boolean;
}

const increment = { type: "INCREMENT", payload: 1 }; // payload is optional unless you specify the increment name (as below).
// const incrementByAmount = { type: "INCREMENT", payload: 10 };
const decrement = { type: "DECREMENT", payload: 1 };

export default function CounterReduxComponent() {
    return (
        <div>
            <Provider store={store}>
                <h2>Redux Counter Tutorial</h2>
                <CounterComponent />
            </Provider>
        </div>
    );
}