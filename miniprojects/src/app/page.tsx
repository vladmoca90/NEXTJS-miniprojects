"use client";
import "./styles/sign-in-out.css";
import { useState } from "react";
import { SignContext } from "./sign-in-out-context/signContext/signContext";
import NavComponent from "./NavComponent"

export default function SignComponent() {
    const [signIn, setSignIn] = useState(false);

    return (
        <SignContext.Provider value={[signIn, setSignIn]}>
            <NavComponent />
            <h1>{signIn ? "Signed in" : "Signed out"}</h1>
        </SignContext.Provider>
    );
}