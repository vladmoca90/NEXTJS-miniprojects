"use client";
import "./styles/sign-in-out.css";
import { useState } from "react";
import { SignContext } from "./sign-in-out-context/signContext/SignContext";
import NavComponent from "./NavComponent"

export default function SignComponent() {
    const [signIn, setSignIn] = useState(false);

    return (
        <SignContext.Provider value={[signIn, setSignIn]}>
            <NavComponent />
            <h1>Sign in</h1>
        </SignContext.Provider>
    );
}