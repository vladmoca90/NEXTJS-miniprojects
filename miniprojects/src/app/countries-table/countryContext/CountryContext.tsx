import { createContext } from "react";
import { Country } from "../../../../data/countries/Country";

export const CountryContext = createContext<Country[]>([]);