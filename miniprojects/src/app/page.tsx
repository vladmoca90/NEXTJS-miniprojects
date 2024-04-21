"use client";
import "./styles/login-username.css";
import ProfileComponent from "./ProfileComponent";
import { useState } from "react";
import LoginComponent from "./LoginComponent";

export default function Login() {
    const [showProfile, setShowProfile] = useState(false);

    return (
        <div>
            {showProfile ? <ProfileComponent /> : <LoginComponent />}
        </div>
    );
}