import { useContext } from "react";
import { LoginContext } from "./login/loginContext/LoginContext";

export default function ProfileComponent() {
    const { username } = useContext(LoginContext); // you now have access to the username state.

    return (
        <div>
            <h1>Profile</h1>
            <h2>Username: { username }</h2>
        </div>
    );
}