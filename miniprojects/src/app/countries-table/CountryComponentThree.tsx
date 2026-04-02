import { useContext } from "react";
import { CountryContext } from "./countryContext/CountryContext";

export default function CountryComponentThree() {
    const { countries } = useContext(CountryContext);

    return <>{countries.length}</>;
}