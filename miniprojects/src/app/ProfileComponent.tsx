import "./styles/profile.css";
import { useContext } from "react";
import { ProfileContext } from "./profile/profileContext/ProfileContext";

export default function ProfileComponent() {
    const profile = useContext(ProfileContext);

    return (
        <div className="profile-container">
            <p>Full name: {profile.forename} {profile.surname}</p>
            <p>Age: {profile.age}</p>
            <p>Nationality: {profile.nationality}</p>
            <p>Occupation: {profile.occupation}</p>
        </div>
    );
}