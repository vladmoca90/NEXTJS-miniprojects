import { useContext } from "react";
import { CountryContext } from "./countries/countryContext/CountryContext";
import CountryComponentThree from "./CountryComponentThree";


export default function CountryComponentTwo() {
    const newCountry = useContext(CountryContext);

    return (
        <>
            <span className="new-country">{newCountry.length}</span>
            <CountryComponentThree />
        </>
    );
}