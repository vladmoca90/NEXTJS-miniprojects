"use client";
import "./styles/sign-in-out.css";
import { useState } from "react";
import NavComponent from "./NavComponent"

export default function SignComponent() {
    const [signIn, setSignIn] = useState(false);
    
    return (
        <div>
            <NavComponent />
            <h1>Sign in</h1>
        </div>
    );
}