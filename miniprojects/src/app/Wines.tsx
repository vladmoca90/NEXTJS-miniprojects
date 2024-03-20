import "./styles/wines.css";

export type WinesProps = {
    name: string,
    age: number,
}

export const Wines = (props: WinesProps) => {
    return (
        <div>
            <p>My name is {props.name}</p>
            <p>My age is {props.age}</p>
        </div>
    );
}