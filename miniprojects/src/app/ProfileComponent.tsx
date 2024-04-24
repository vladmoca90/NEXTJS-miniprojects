import { useContext } from "react";
import { ProfileContext } from "./person-profile/personProfileContext/ProfileContext";

const profileStyle = {
    lineHeight: "24px",
    margin: "2rem auto 0",
    maxWidth: "320px",
    padding: "0 0 1rem",
}

export default function ProfileComponent() {
    const data = useContext(ProfileContext);

    return (
        <div style={profileStyle}>
            <h3>Full name: {data.forename} {data.surname}</h3>
            <h3>Age: {data.age}</h3>
            <h3>Nationality: {data.nationality}</h3>
            <h3>Occupation: {data.occupation}</h3>
        </div>
    );
}