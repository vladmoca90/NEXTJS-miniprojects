export type GreetProps = {
    name: string,
    age: number,
}

export const Greet = (props: GreetProps) => {
    return (
        <div>
            <p>My name is {props.name}</p>
            <p>My age is {props.age}</p>
        </div>
    );
}