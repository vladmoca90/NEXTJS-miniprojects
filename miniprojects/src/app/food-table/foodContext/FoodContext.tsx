import { createContext } from "react";
import { Food } from "../../../../data/foodList/Food";

// Define the shape of the context
interface FoodContextType {
    // Define the properties you expect in the context
    foods: Food[]; // Assuming you have a Food type defined
    setFoods: (foods: Food[]) => void; // Function to update the foods
}

// Create the context with a default value
export const FoodContext = createContext<FoodContextType | undefined>(undefined);
