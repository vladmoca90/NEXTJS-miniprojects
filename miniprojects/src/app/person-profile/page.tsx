"use client";
import { useState } from "react";
import ProfileComponent from "./ProfileComponent";
import { data, ProfileContext } from "./person-profile/personProfileContext/ProfileContext";

// example you followed: https://chat.openai.com/c/5c08ed3d-7522-4431-93b3-12aacf00015a

export default function ProfileProfile() {
    const [firstName, setFirstName] = useState(data.forename);

    return (
        <div id="ProfileContent">
            <ProfileContext.Provider value={data}>
                <ProfileComponent />
            </ProfileContext.Provider>
        </div>
    );
}