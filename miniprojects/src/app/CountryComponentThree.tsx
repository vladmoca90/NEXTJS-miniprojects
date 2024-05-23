import { useContext } from "react";
import { CountryContext } from "./countries/countryContext/CountryContext";

export default function CountryComponentThree() {
    const countriesContext = useContext(CountryContext);

    return (
        <>{countriesContext.length}</>
    );
}