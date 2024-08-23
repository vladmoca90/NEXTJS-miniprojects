import { createSlice } from "@reduxjs/toolkit";

export interface ListItem {
    item: string;
}

const initialState: ListItem = {
    item: "",
}

export const ListItemSlice = createSlice({
    name: "listItem",
    initialState,
    reducers: {

    }
});

export default ListItemSlice.reducer;