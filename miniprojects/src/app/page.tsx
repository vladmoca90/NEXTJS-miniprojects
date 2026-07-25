"use client";
import { useState } from "react";
import ProfileComponent from "./profile/ProfileComponent";
import { ProfileContext } from "./profile/profileContext/ProfileContext";
import { ProfilePerson } from "../../data/profile/ProfilePerson";

export default function ProfileProfile() {
    const [profile, setProfile] = useState(ProfilePerson);

    return (
        <div id="ProfileContent">
            <ProfileContext.Provider value={profile}>
                <ProfileComponent />
            </ProfileContext.Provider>
        </div>
    );
}
