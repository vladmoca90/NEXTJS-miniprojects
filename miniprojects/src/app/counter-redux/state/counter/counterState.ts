import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
    value: number;
}

const initialState: CounterState = {
    value: 0,
}

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => { // action as second argument is only optional. In this case you wouldn't need it.
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
    },
});

export default counterSlice.reducer;

// We get access to a reducer and export it.
// It is available because we use createSlice({});