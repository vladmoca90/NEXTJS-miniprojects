import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ListItem {
    id: number;
    item: string;
}

interface ListState {
    items: ListItem[];
}

const initialState: ListState = {
    items: [],
};

const ListItemSlice = createSlice({
    name: "listItem",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<string>) => {
            const newItem: ListItem = {
                id: Date.now(), // or any unique id generator
                item: action.payload,
            };
            state.items.push(newItem);
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
    },
});

export const { addItem, removeItem } = ListItemSlice.actions;
export default ListItemSlice.reducer;
