import { createContext } from "react";
import { ProfilePerson } from "../../../../data/profile/ProfilePerson";

// Create the context with the initial value as the Profile object
export const ProfileContext = createContext(ProfilePerson);
