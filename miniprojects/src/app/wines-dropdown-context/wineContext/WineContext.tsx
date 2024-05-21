import { createContext, useContext } from "react";

export const WineContext = createContext({});

export function useWineContext() {
    const wineRepository = useContext(WineContext);

    return wineRepository;
}