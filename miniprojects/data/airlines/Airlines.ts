export interface Airline {
  id: number;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  price: number;
  currency: "GBP";
  stops: number;
  departureAirport: string;
  arrivalAirport: string;
  cabinClass: "Economy" | "Premium Economy" | "Business";
  availableSeats: number;
};