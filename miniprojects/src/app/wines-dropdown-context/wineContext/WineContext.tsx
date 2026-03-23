import { createContext, Dispatch, SetStateAction } from "react";

export interface Wine {
  id: number;
  name: string;
  img: string;
}

interface WineContextType {
  wines: Wine[];
  setWines: Dispatch<SetStateAction<Wine[]>>;
}

const defaultWineContext: WineContextType = {
  wines: [],
  setWines: () => {},
};

export const WineContext = createContext<WineContextType>(defaultWineContext);