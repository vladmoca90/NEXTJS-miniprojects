import { createContext } from "react";

interface LoginContextType {
    username: string;

    setUsername: (
        username: string
    ) => void;

    setShowProfile: (
        show: boolean
    ) => void;
}

export const LoginContext =
    createContext<LoginContextType>({
        username: "",

        setUsername: () => {},
        setShowProfile: () => {},
    });