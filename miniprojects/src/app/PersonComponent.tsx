import usePersonContext from "./PersonContext";

export default function PersonComponent() {
    const data = usePersonContext();

    return (
        <div>
            <h3>{data.forename}</h3>
            <h3>{data.surname}</h3>
        </div>
    );
}