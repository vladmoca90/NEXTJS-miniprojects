import { Key } from "react";
import { CountryNames } from "./countryNames";

export interface CountryRow {
    index: Key | null | undefined;
    id: number;
    cca2: string;
    cca3: string;
    flags: {
        "png": string,
        "svg": string,
        "alt": string,
    },
    name: CountryNames;
}