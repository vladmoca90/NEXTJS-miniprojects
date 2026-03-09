"use client";
import "./styles/to-do-list.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ToDoListComponent from "./ToDoListComponent";

export default function Home() {
  return (
    <Provider store={store}>
      <div>
        <h1>My ToDo List</h1>
        <ToDoListComponent />
      </div>
    </Provider>
  );
}
