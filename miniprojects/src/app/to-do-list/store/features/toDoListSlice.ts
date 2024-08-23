import { createSlice } from "@reduxjs/toolkit";

export interface ListItem {
    item: string;
}

const initialState: ListItem = {
    item: "",
}

const listItemSlice = createSlice({
    name: "listItem",
    initialState,
    reducers: {

    }
});

export default listItemSlice.reducer;