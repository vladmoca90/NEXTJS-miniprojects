import { createContext } from "react";
import { Country } from "../../../../data/countries/Country";

let countryContext = createContext<Country | undefined>(undefined);