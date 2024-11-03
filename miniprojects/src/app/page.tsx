"use client";
import React from "react";
import { Provider } from 'react-redux';
import { store } from './to-do-list/store/store';
import ToDoList from "./ToDoList";

export default function Home() {
    return (
        <Provider store={store}>
        <div>
            <h1>My ToDo List</h1>
            <ToDoList />
        </div>
        </Provider>
    );
}
