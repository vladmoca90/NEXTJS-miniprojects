import CounterComponent from "./CounterComponent";

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
            <h2>Redux Counter Tutorial</h2>
            <CounterComponent />
        </div>
    );
}