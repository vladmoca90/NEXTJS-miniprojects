import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./counter-redux/state/store";
import { decrement, increment, incrementByAmount } from "./counter-redux/state/counter/counterState";

export default function CounterComponent() {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div>
            <h3>{count}</h3>
            <div className="counter-block">
                <button onClick={() => dispatch(incrementByAmount(10))}>Increment</button>
                <button onClick={() => dispatch(decrement())}>Decrement</button>
            </div>
        </div>
    );
}