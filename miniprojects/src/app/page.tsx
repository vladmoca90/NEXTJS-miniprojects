"use client";
import "./styles/login-username.css";
import LoginComponent from "./LoginComponent";
import ProfileComponent from "./ProfileComponent";
import { useState } from "react";
import { LoginContext } from "./login/loginContext/loginContext";

export default function Login() {
    const [showProfile, setShowProfile] = useState(false);
    const [username, setUsername] = useState("");

    return (
        <div>
            <LoginContext.Provider value={{username, setUsername, setShowProfile}}>
                {showProfile ? <ProfileComponent /> : <LoginComponent />}
            </LoginContext.Provider>
        </div>
    );
}