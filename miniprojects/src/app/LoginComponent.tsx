"use client";
import { useState } from "react";

export default function Login() {
    const [username, setUsername] = useState("");

    return (
        <div id="loginContainer">
            <div>
                <input type="text" placeholder="Username..." onChange={(event) => {setUsername(event.target.value);}} />
                <input type="password" placeholder="Password..." />
                <button className="login-btn">Login</button>
            </div>
        </div>
    );
}