import { createContext, useContext } from "react";
import { Country } from "../../../../data/countries/Country";

export const CountryContext = createContext<Country | undefined>(undefined);

export function useCountryContext() {
    const addCountry = useContext(CountryContext);

    if (addCountry === undefined) {
        throw new Error("The country context cannot be undefined!");
    }

    return addCountry;
}