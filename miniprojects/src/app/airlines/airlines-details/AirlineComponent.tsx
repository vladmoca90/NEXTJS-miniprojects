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

  useEffect(() => {
    getFlights();
  }, [getFlights]);

  return (
    <div className="airline-component border border-gray-300 p-4 rounded-lg shadow-md">
      {flights.map((flight) => (
        <div key={flight.id} className="flight-card p-4 mb-4 mt-4">
          <p>{flight.airline}</p>
          <p>
            {flight.origin} ({flight.departureAirport}) → {flight.destination} (
            {flight.arrivalAirport})
          </p>
        </div>
      ))}
    </div>
  );
}
