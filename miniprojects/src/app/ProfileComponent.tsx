import { useContext } from "react";
import { ProfileContext } from "./person-profile/personProfileContext/ProfileContext";

const profileStyle = {
    lineHeight: "24px",
    margin: "2rem auto 0",
    maxWidth: "320px",
    padding: "0 0 1rem",
}

export default function ProfileComponent() {
    const usedData = useContext(ProfileContext);

    return (
        <div style={profileStyle}>
            <h3>Full name: {usedData.forename} {usedData.surname}</h3>
            <h3>Age: {usedData.age}</h3>
            <h3>Nationality: {usedData.nationality}</h3>
            <h3>Occupation: {usedData.occupation}</h3>
        </div>
    );
}