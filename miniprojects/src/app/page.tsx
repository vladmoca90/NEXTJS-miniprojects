import PersonComponent from "./PersonComponent";
import { PersonContext } from "./PersonContext";

export default function PersonProfile() {
    const data = {
        forename: "Johnathan",
        surname: "McGovern",
        age: 30,
        nationality: "American",
        occupation: "Content Design Producer"
    }

    return (
        <div id="PersonContent">
            <PersonContext.Provider value={{ data }}>
                <PersonComponent />
            </PersonContext.Provider>
        </div>
    );
}