import { Country } from "../../data/countriesList/countryList";

export interface countriesRowProps {
    country: Country;
}

export function CountriesRowComponent(props: countriesRowProps) {
    const { country } = props;

    return (
        <>
            <li key={country.index} data-country={country.name.common}>
                <span key={country.index}>{country.name.common}</span>
                <span key={country.index}>{country.name.official}</span>
                <span key={country.index}>
                    <img className="countries-list-img" alt={country.flags.alt} src={country.flags.png} />
                </span>
                <span key={country.index}>{country.flags.alt}</span>
            </li>
        </>
    )
}