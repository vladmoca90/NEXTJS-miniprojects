import { Country } from "../../data/countriesList/countryList";

export interface countriesListProps {
    country: Country;
}

export function CountriesListComponent(props: countriesListProps) {
    const { country } = props;

    return (
        <>
            <ul className="countries-list">
                <li className="list-title">
                    <span className="country-name">Name</span>
                    <span className="country-name">Official name</span>
                    <span className="country-img">Flag</span>
                    <span className="country-description">Flag description</span>
                </li>
                <li key={country.index} data-country={country.name.common}>
                    <span key={country.index}>{country.name.common}</span>
                    <span key={country.index}>{country.name.official}</span>
                    <span key={country.index}>{country.flags.png}</span>
                    <span key={country.index}>{country.flags.alt}</span>
                </li>
            </ul>
        </>
    )
}