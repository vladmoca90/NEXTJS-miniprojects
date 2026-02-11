import { createContext } from "react";
import { Profile } from "../../../../data/profile/Profile"; // Import the Profile object

// Create the context with the initial value as the Profile object
export const ProfileContext = createContext(Profile);
