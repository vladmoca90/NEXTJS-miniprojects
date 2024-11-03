// WineContext.tsx
import { createContext } from "react";

// Define the structure for a wine object
interface Wine {
  id: number;
  name: string;
  // Add other properties if needed, e.g., year, region, etc.
}

// Define the context value type
interface WineContextType {
  wines: Wine[];
}

// Create a default context value
const defaultWineContext: WineContextType = {
  wines: [], // Default to an empty array
};

// Create the WineContext with the default value and type
export const WineContext = createContext<WineContextType>(defaultWineContext);
