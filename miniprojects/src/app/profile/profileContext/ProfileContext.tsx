import { createContext } from "react";
import { Profile } from "../../../../data/profile/Profile";

export const ProfileContext = createContext(Profile[0]);
