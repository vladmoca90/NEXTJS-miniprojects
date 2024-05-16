import "./styles/profile.css";
import { useContext } from "react";
import { ProfileContext } from "./person-profile/personProfileContext/ProfileContext";

export default function ProfileComponent() {
    const profile = useContext(ProfileContext);

    return (
        <div className="profile-container">
            <h3>Full name: {profile.forename} {profile.surname}</h3>
            <h3>Age: {profile.age}</h3>
            <h3>Nationality: {profile.nationality}</h3>
            <h3>Occupation: {profile.occupation}</h3>
        </div>
    );
}