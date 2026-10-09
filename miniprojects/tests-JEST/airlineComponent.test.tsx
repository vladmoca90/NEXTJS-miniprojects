import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AirlineComponent } from '../src/app/airlines/airlines-details/AirlineComponent';
import { Airline } from '../data/airlines/Airlines';

const mockAirlines: Airline[] = [
  {
    id: 1,
    airline: 'British Airways',
    origin: 'London',
    destination: 'New York',
    departureTime: '10:00',
    arrivalTime: '13:00',
    durationMinutes: 420,
    price: 199.99,
    currency: 'GBP',
    stops: 0,
    departureAirport: 'LHR',
    arrivalAirport: 'JFK',
    cabinClass: 'Economy',
    availableSeats: 20,
  },
  {
    id: 2,
    airline: 'Emirates',
    origin: 'London',
    destination: 'Dubai',
    departureTime: '14:00',
    arrivalTime: '23:00',
    durationMinutes: 540,
    price: 349.5,
    currency: 'GBP',
    stops: 0,
    departureAirport: 'LGW',
    arrivalAirport: 'DXB',
    cabinClass: 'Business',
    availableSeats: 12,
  },
];

describe('AirlineComponent', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ body: mockAirlines }),
    } as Response);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('fetches and displays airline details', async () => {
    render(<AirlineComponent />);

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/airlines');
    expect(await screen.findByText('British Airways')).toBeInTheDocument();
    expect(screen.getByText('London (LHR) → New York (JFK)')).toBeInTheDocument();
    expect(screen.getByText('10:00 - 13:00')).toBeInTheDocument();
    expect(screen.getByText('Price: £199.99')).toBeInTheDocument();
    expect(screen.getByText('Emirates')).toBeInTheDocument();
  });

  it('filters airlines by a case-insensitive search', async () => {
    render(<AirlineComponent />);
    await screen.findByText('British Airways');

    fireEvent.change(screen.getByPlaceholderText('Search flights...'), {
      target: { value: 'EMIRATES' },
    });

    expect(screen.getByText('Emirates')).toBeInTheDocument();
    expect(screen.queryByText('British Airways')).not.toBeInTheDocument();
  });

  it('logs an error when the API request fails', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => ({}),
    } as Response);
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<AirlineComponent />);

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith(
        'Error fetching flights data:',
        expect.any(Error),
      );
    });
    expect(screen.queryByText('British Airways')).not.toBeInTheDocument();
  });
});
