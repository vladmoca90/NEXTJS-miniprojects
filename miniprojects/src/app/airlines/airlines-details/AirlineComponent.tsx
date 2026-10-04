import React, { useState } from "react";
import { Airline } from "../../../../data/airlines/Airlines";

export function AirlineComponent() {
  const [flights, setFlights] = useState<Airline[]>([]);

  return (
    <div className="airline-component">
      {flights.map((flight) => (
        <div key={flight.id} className="flight-card">
          <h2>{flight.airline}</h2>
        </div>
      ))}
    </div>
  );
}