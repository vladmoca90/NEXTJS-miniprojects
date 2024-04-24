import { createContext, useContext } from "react";

export const PersonContext = createContext({});

export default function usePersonContext() {
    const personRepository = useContext(PersonContext);

    return personRepository;
}