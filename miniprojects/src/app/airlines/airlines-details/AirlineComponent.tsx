"use client";
import { useCallback, useEffect, useState } from "react";
import { Airline } from "../../../../data/airlines/Airlines";

const airlinesUrl = "http://localhost:3000/api/airlines";

export function AirlineComponent() {
  const [flights, setFlights] = useState<Airline[]>([]);

  const getFlights = useCallback(async () => {
    try {
      const response = await fetch(airlinesUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch flights data");
      }

      const data = await response.json();
      setFlights(data.body);

      console.log(data);
    } catch (error) {
      console.error("Error fetching flights data:", error);
    }
  }, [airlinesUrl]);

  const filterAirlines = (searchFlight: string) => {
    const filteredFlights = flights.filter((flight) =>
      flight.airline.toLowerCase().includes(searchFlight.toLowerCase())
    );

    setFlights(filteredFlights);
  }

  useEffect(() => {
    getFlights();
  }, [getFlights]);

  return (
    <div className="airline-component border border-gray-300 p-4">
      <input type="text" placeholder="Search flights..." onChange={(e) => filterAirlines(e.target.value)} className="search-input mb-4 p-2 border border-gray-300" />
      <div>
      {flights.map((flight) => (
        <div key={flight.id} className="flight-card p-4 mb-4 mt-4">
          <p className="airline-name">
            <span>{flight.airline}</span>
            <a
              href={`https://en.wikipedia.org/wiki/${encodeURIComponent(flight.airlineCountry.name.replaceAll(" ", "_"))}`}
              aria-label={`Learn about ${flight.airlineCountry.name}`}
            >
              <img
                className="airline-flag"
                src={`https://flagcdn.com/${flight.airlineCountry.code}.svg`}
                alt={`${flight.airlineCountry.name} flag`}
                width={50}
              />
            </a>
          </p>
          <p>
            {flight.origin} ({flight.departureAirport}) → {flight.destination} (
            {flight.arrivalAirport})
          </p>
          <p>{flight.departureTime} - {flight.arrivalTime}</p>
          <p>Price: £{flight.price.toFixed(2)}</p>
        </div>
      ))}
      </div>
    </div>
  );
}
