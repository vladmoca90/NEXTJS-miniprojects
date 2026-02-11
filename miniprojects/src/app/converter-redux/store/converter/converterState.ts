import { createSlice } from "@reduxjs/toolkit";

interface ConverterState {
    value: number;
}

export const initialConverter: ConverterState = {
    value: 0,
}

const counterSlice = createSlice({
    name: "converter",
    initialConverter,
    reducers: {
    },
});