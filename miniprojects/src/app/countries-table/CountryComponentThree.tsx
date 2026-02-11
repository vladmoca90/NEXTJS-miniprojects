import { useContext } from "react";
import { CountryContext } from "./countries/countryContext/CountryContext";

export default function CountryComponentThree() {
    const countriesContext = useContext(CountryContext);

    return (
        // <span className="new-country">
        //     {
        //         countriesContext.map((countryContext, index) => {
        //             return (
        //                 <div key={index}>{countryContext.name}</div>
        //             );
        //         })
        //     }
        // </span>
        <>{countriesContext.length}</>
    );
}