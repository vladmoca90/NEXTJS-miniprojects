"use client";
import "../styles/add-list.css";
import { Provider } from "react-redux";
import { AddComponent } from "./AddComponent";
import { ListComponent } from "./ListComponent";
import { store } from "./store/store";

export default function App() {
    return (
        <main>
            <Provider store={store}>
                <AddComponent />
                <ListComponent />
            </Provider>
        </main>
    );
}
