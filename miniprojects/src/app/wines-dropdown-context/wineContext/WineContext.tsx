import { createContext, useContext } from "react";
import { Wine } from "../../../../data/wines/Wine";

export const WineContext = createContext<Wine[]>([]);

export function UseWineContext() {
    const wineRepository = useContext(WineContext);

    if(wineRepository === undefined) {
        throw new Error("The context cannot be undefined");
    }

    return wineRepository;
}