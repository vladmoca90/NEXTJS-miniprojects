import { createContext, useContext } from "react";

export const WineContext = createContext({});

export function useWineContext() {
    const wineRepository = useContext(WineContext);

    if(wineRepository === "undefined") {
        throw new Error("The context cannot be undefined");
    }

    return wineRepository;
}