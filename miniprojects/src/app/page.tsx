"use client";
import "../styles/add-list.css";
import { Provider } from "react-redux";
import { AddComponent } from "./add-list-redux/AddComponent";
import { ListComponent } from "./add-list-redux/ListComponent";
import { store } from "./add-list-redux/store/store";

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
