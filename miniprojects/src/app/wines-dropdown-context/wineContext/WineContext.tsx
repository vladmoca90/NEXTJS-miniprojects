import { createContext, Dispatch, SetStateAction } from "react";
import { Wine } from "../../../../data/wines/Wine";

interface WineContextType {
  wines: Wine[];
  setWines: Dispatch<SetStateAction<Wine[]>>;
}

const defaultWineContext: WineContextType = {
  wines: [],
  setWines: () => {},
};

export const WineContext = createContext<WineContextType>(defaultWineContext);