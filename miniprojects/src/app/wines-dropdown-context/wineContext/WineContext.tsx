import { createContext, Dispatch, SetStateAction } from "react";

// Define the structure for a wine object
interface Wine {
  id: number;
  name: string;
}

// Define the context value type
interface WineContextType {
  wines: Wine[];
  setWines: Dispatch<SetStateAction<Wine[]>>; // Add this to allow updates
}

// Create a default context value
const defaultWineContext: WineContextType = {
  wines: [],
  setWines: () => {}, // Placeholder function to avoid undefined errors
};

// Create the WineContext with the default value and type
export const WineContext = createContext<WineContextType>(defaultWineContext);
