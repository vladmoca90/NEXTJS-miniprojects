import { createContext, useContext } from "react";
import { Wine } from "../../../../data/wines/Wine";

export const WineContext = createContext<Wine | undefined>(undefined);

export function useWineContext() {
    const wineRepository = useContext(WineContext);

    if (wineRepository === undefined) {
        throw new Error("The context of wine cannot be undefined");
    }

    return wineRepository;
}