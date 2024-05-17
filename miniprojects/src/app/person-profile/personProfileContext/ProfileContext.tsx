import { createContext } from "react";

export const data = {
    forename: "Jack",
    surname: "McGovern",
    age: 33,
    nationality: "British",
    occupation: "Senior Design Producer",
}

export const ProfileContext = createContext(data);