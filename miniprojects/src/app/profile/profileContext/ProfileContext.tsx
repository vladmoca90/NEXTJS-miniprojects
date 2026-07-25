"use client";
import { createContext } from "react";
import type { Profile } from "../../../../data/profile/Profile";

export const ProfileContext = createContext<Profile | undefined>(undefined);