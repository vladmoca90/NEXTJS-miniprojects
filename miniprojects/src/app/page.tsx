"use client";
import "./styles/to-do-list.css";
import React from "react";
import { Provider } from 'react-redux';
import { store } from './to-do-list/store/store';
import ToDoListComponent from "./to-do-list/ToDoListComponent";

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