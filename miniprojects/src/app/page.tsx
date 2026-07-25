"use client";
import { useState } from "react";
import ProfileComponent from "./profile/ProfileComponent";
import { ProfileContext } from "./profile/profileContext/ProfileContext";
import { Profile } from "../../data/profile/Profile";

export default function ProfileProfile() {
    const [profile, setProfile] = useState(Profile);

    return (
        <div id="ProfileContent">
            <ProfileContext.Provider value={profile}>
                <ProfileComponent />
            </ProfileContext.Provider>
        </div>
    );
}
