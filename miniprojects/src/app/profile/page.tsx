"use client";
import { useState } from "react";
import ProfileComponent from "./ProfileComponent";
import { ProfileContext } from "./profile/profileContext/ProfileContext";
import { Profile } from "../../data/profile/Profile";

// Example you followed: https://chat.openai.com/c/5c08ed3d-7522-4431-93b3-12aacf00015a

export default function ProfileProfile() {
    const [profile, setProfile] = useState(Profile); // Renamed firstName to profile

    return (
        <div id="ProfileContent">
            <ProfileContext.Provider value={profile}> {/* Use the profile state */}
                <ProfileComponent />
            </ProfileContext.Provider>
        </div>
    );
}
