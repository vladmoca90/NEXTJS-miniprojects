import { Country } from "../../data/countriesList/countryList";

export interface countriesListProps {
    country: Country;
}

export function CountriesListComponent(props: countriesListProps) {
    const { country } = props;

    return (
        <>
            <li key={country.index} data-country={country.name.common}>
                <span key={country.index}>{country.name.common}</span>
                <span key={country.index}>{country.name.official}</span>
                <span key={country.index}>{country.flags.png}</span>
                <span key={country.index}>{country.flags.alt}</span>
            </li>
        </>
    )
}