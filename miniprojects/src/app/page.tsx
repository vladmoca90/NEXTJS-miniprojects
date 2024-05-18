"use client";
import { useState } from "react";
import ProfileComponent from "./ProfileComponent";
import { ProfileContext } from "./profile/profileContext/ProfileContext";
import { Profile } from "../../data/profile/Profile";

// example you followed: https://chat.openai.com/c/5c08ed3d-7522-4431-93b3-12aacf00015a

export default function ProfileProfile() {
    const [firstName, setFirstName] = useState(Profile[0]);

    return (
        <div id="ProfileContent">
            <ProfileContext.Provider value={Profile[0]}>
                <ProfileComponent />
            </ProfileContext.Provider>
        </div>
    );
}