import { useContext } from "react";
import { ProfileContext } from "./person-profile/personProfileContext/ProfileContext";

export default function ProfileComponent() {
    const usedData = useContext(ProfileContext);

    return (
        <div className="profile-container">
            <h3>Full name: {usedData.forename} {usedData.surname}</h3>
            <h3>Age: {usedData.age}</h3>
            <h3>Nationality: {usedData.nationality}</h3>
            <h3>Occupation: {usedData.occupation}</h3>
        </div>
    );
}