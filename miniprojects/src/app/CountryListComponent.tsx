import Link from "next/link";
import { Country } from "../../data/countries/Country";
import CountryComponentTwo from "./CountryComponentTwo";

export interface CountriesProps {
    country: Country;
}

export default function CountriesListComponent(props: CountriesProps) {
    const { country } = props;

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td>
                <Link href={{
                    pathname: "/country-name",
                    query: {
                        "countryName": country.name,
                    },
                }}>{country.name}</Link>
            </td>
            <td>{country.code}</td>
            <td><CountryComponentTwo /></td>
        </tr>
    );
}