import { createContext } from "react";

interface LoginContextType {
    setUsername: (
        username: string
    ) => void;

    setShowProfile: (
        show: boolean
    ) => void;
}

export const LoginContext =
    createContext<LoginContextType>({
        setUsername: () => {},

        setShowProfile: () => {},
    });