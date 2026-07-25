"use client";
import ProfileComponent from "./profile/ProfileComponent";
import { ProfileContext } from "./profile/profileContext/ProfileContext";
import { ProfilePerson } from "../../data/profile/ProfilePerson";

export default function ProfilePage() {
  return (
    <div id="ProfileContent">
      <ProfileContext.Provider value={ProfilePerson}>
        <ProfileComponent />
      </ProfileContext.Provider>
    </div>
  );
}