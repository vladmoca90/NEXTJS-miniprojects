import Link from "next/link";
import { Country } from "../../data/countries/Country";
import { useCountryContext } from "./countries/countriesContext/CountryContext";

export interface CountriesProps {
    country: Country;
}

export default function CountriesListComponent(props: CountriesProps) {
    const useCountry = useCountryContext();

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td>
                <Link href={{
                    pathname: "/country-name",
                    query: {
                        "countryName": useCountry.name,
                    },
                }}>{useCountry.name}</Link>
            </td>
            <td>{useCountry.code}</td>
        </tr>
    );
}