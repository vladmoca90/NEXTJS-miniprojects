import { Country } from "../../data/countriesList/countryList";

export interface CountriesRowProps {
    country: Country;
}

export function CountriesRowComponent({ country }: CountriesRowProps) {
    return (
        <li data-country={country.name.common}>
            <span>{country.name.common}</span>
            <span>{country.name.official}</span>
            <span>
                <img 
                    className="countries-list-img" 
                    alt={country.flags.alt} 
                    src={country.flags.png} 
                />
            </span>
            <span>{country.flags.alt}</span>
        </li>
    );
}
