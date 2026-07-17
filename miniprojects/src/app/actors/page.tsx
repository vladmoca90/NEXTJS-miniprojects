"use client";
import "./styles/actors.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ActorsContentComponent from "./ActorsContentComponents";

export default function GetActors() {
  return (
    <Provider store={store}>
      <ActorsContentComponent />
    </Provider>
  );
}