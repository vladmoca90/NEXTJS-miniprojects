import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./counter-redux/state/store";
import { decrement, increment, incrementByAmount, incrementAsync } from "./counter-redux/state/counter/counterState";

export default function CounterComponent() {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch<AppDispatch>(); // needed if you work with asynchronous actions.

    return (
        <div>
            <h3>{count}</h3>
            <div className="counter-block">
                <button onClick={() => dispatch(incrementAsync(1))}>Increment</button>
                <button onClick={() => dispatch(decrement())}>Decrement</button>
            </div>
        </div>
    );
}