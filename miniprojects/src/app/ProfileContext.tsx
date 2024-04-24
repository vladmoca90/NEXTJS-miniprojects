import { createContext } from "react";

export const data = {
    forename: "Johnathan",
    surname: "McGovern",
    age: 30,
    nationality: "American",
    occupation: "Content Design Producer"
}

export const ProfileContext = createContext(data);