import { createContext } from "react";
import { Country } from "../../../../data/countries/Country";

export interface CountryContextType {
    countries: Country[];
}

export const CountryContext = createContext<CountryContextType>({
    countries: [],
});