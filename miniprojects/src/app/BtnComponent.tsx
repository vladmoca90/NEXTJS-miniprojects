import { useState } from "react";

export default function BtnComponent() {
    const [signIn, setSignIn] = useState(false);

    return (
        <button onClick={() => setSignIn(!signIn)}>
            {signIn ? "Sign out" : "Sign in"}
        </button>
    );
}