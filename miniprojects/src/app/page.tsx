"use client";
import ProfileComponent from "./ProfileComponent";
import { data, ProfileContext } from "./ProfileContext";

export default function ProfileProfile() {

    return (
        <div id="ProfileContent">
            <ProfileContext.Provider value={data}>
                <ProfileComponent />
            </ProfileContext.Provider>
        </div>
    );
}