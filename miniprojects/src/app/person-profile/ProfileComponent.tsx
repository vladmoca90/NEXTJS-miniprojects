import { useContext } from "react";
import { ProfileContext } from "./personProfileContext/ProfileContext";

export default function ProfileComponent() {
    const data = useContext(ProfileContext);

    return (
        <div>
            <h3>{data.forename}</h3>
            <h3>{data.surname}</h3>
            <h3>{data.age}</h3>
            <h3>{data.nationality}</h3>
            <h3>{data.occupation}</h3>
        </div>
    );
}