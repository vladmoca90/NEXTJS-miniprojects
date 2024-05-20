import { useContext } from "react";
import { SignContext } from "./sign-in-out-context/signContext/signContext";

export default function BtnComponent() {
    const [signIn, setSignIn] = useContext(SignContext);

    return (
        <button onClick={() => setSignIn(!signIn)}>
            {signIn ? "Sign out" : "Sign in"}
        </button>
    );
}