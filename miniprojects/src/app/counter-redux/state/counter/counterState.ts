import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
        incrementByAmount: (state, action: PayloadAction<number>) => {
            // <number> from PayloadSAction can be declared any way you want.
            // this is just optional if you want to add arguments to increment() and decrement(). Otherwise no!
            state.value += action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            incrementAsync.pending, (state) => {
                console.log("incrementAsync.pending");
            }
        ).addCase(
            incrementAsync.fulfilled, (state, action) => {
                state.value += action.payload;
            }
        );
    }
});

export const incrementAsync = createAsyncThunk(
    "counter/incrementAsync",
    async (amount: number) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return amount;
    }
);

export const { increment, decrement, incrementByAmount } = counterSlice.actions; // we will export the actions from the counterSlice({});
export default counterSlice.reducer;

// We get access to a reducer and export it.
// It is available because we use createSlice({});