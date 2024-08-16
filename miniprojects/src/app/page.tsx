"use client";
import { Provider } from "react-redux";
import { AddComponent } from "./AddComponent";
import { ListComponent } from "./ListComponent";
import { store } from "./converter-redux/store/store";

export default function App() {
    return (
        <>
            <Provider store={store}>
                <AddComponent />
                <ListComponent />
            </Provider>
        </>
    );
}