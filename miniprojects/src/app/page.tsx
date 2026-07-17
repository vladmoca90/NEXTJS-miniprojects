"use client";
import "./styles/actors.css";
import { Provider } from "react-redux";
import { store } from "./actors/store/store";
import ActorsContentComponent from "./actors/ActorsContentComponents";

export default function GetActors() {
  return (
    <Provider store={store}>
      <ActorsContentComponent />
    </Provider>
  );
}