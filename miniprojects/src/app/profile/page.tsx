"use client";
import ProfileComponent from "./ProfileComponent";
import { ProfileContext } from "./profileContext/ProfileContext";
import { ProfilePerson } from "../../../data/profile/ProfilePerson";

export default function ProfilePage() {
  return (
    <div id="ProfileContent">
      <ProfileContext.Provider value={ProfilePerson}>
        <ProfileComponent />
      </ProfileContext.Provider>
    </div>
  );
}