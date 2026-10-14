"use client";
import { useCallback, useEffect, useState } from "react";
import { Airline } from "../../../../data/airlines/Airlines";

const airlinesUrl = "http://localhost:3000/api/airlines";
const airlinesPerPage = 10;

export function AirlineComponent() {
  const [flights, setFlights] = useState<Airline[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const getFlights = useCallback(async () => {
    try {
      const response = await fetch(airlinesUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch flights data");
      }

      const data = await response.json();
      setFlights(data.body);
    } catch (error) {
      console.error("Error fetching flights data:", error);
    }
  }, []);

  useEffect(() => {
    getFlights();
  }, [getFlights]);

  const filteredFlights = flights.filter((flight) =>
    flight.airline.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const pageCount = Math.max(1, Math.ceil(filteredFlights.length / airlinesPerPage));
  const pageFlights = filteredFlights.slice(
    (currentPage - 1) * airlinesPerPage,
    currentPage * airlinesPerPage
  );

  return (
    <div className="airline-component border border-gray-300 p-4">
      <input
        type="text"
        placeholder="Search flights..."
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);
          setCurrentPage(1);
        }}
        className="search-input mb-4 p-2 border border-gray-300"
      />
      <div>
        {pageFlights.map((flight) => (
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
            <p className="flight-route mt-4">
              {flight.origin} ({flight.departureAirport}) → {flight.destination} ({flight.arrivalAirport})
            </p>
            <p className="flight-time">
              {flight.departureTime} - {flight.arrivalTime}
            </p>
            <p className="flight-price mt-4">
              Price: £{flight.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4" aria-label="Airline pagination">
        <button
          type="button"
          onClick={() => setCurrentPage((page) => page - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          Previous
        </button>
        <span aria-live="polite">
          Page {currentPage} of {pageCount}
        </span>
        <button
          type="button"
          onClick={() => setCurrentPage((page) => page + 1)}
          disabled={currentPage === pageCount}
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </div>
  );
}
