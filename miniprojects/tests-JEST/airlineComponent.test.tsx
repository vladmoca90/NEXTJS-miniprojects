import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AirlineComponent } from '../src/app/airlines/airlines-details/AirlineComponent';
import { Airline } from '../data/airlines/Airlines';

const mockAirlines: Airline[] = [
  {
    id: 1,
    airline: 'British Airways',
    airlineCountry: { name: 'United Kingdom', code: 'gb' },
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
    airlineCountry: { name: 'United Arab Emirates', code: 'ae' },
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

const paginatedAirlines: Airline[] = Array.from({ length: 25 }, (_, index) => ({
  ...mockAirlines[0],
  id: index + 1,
  airline: `Airline ${index + 1}`,
}));

describe('AirlineComponent', () => {
  let fetchMock: jest.SpyInstance;

  beforeEach(() => {
    fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
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
    const flag = screen.getByRole('img', { name: 'United Kingdom flag' });
    expect(flag).toHaveAttribute('src', 'https://flagcdn.com/gb.svg');
    expect(flag).toHaveAttribute('width', '50');
    expect(flag.closest('a')).toHaveAttribute(
      'href',
      'https://en.wikipedia.org/wiki/United_Kingdom',
    );
  });

  it('shows 10 airlines per page and navigates between pages', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ body: paginatedAirlines }),
    } as Response);

    render(<AirlineComponent />);

    expect(await screen.findByText('Airline 1')).toBeInTheDocument();
    expect(screen.getByText('Airline 10')).toBeInTheDocument();
    expect(screen.queryByText('Airline 11')).not.toBeInTheDocument();
    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));

    expect(screen.getByText('Airline 11')).toBeInTheDocument();
    expect(screen.getByText('Airline 20')).toBeInTheDocument();
    expect(screen.queryByText('Airline 10')).not.toBeInTheDocument();
    expect(screen.getByText('Page 2 of 3')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));

    expect(screen.getByText('Airline 21')).toBeInTheDocument();
    expect(screen.getByText('Airline 25')).toBeInTheDocument();
    expect(screen.queryByText('Airline 20')).not.toBeInTheDocument();
    expect(screen.getByText('Page 3 of 3')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: 'Previous page' }));

    expect(screen.getByText('Airline 11')).toBeInTheDocument();
    expect(screen.getByText('Page 2 of 3')).toBeInTheDocument();
  });

  it('resets to the first page when searching', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ body: paginatedAirlines }),
    } as Response);

    render(<AirlineComponent />);
    await screen.findByText('Airline 1');
    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));

    fireEvent.change(screen.getByPlaceholderText('Search flights...'), {
      target: { value: 'Airline 2' },
    });

    expect(screen.getByText('Airline 2')).toBeInTheDocument();
    expect(screen.getByText('Page 1 of 1')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
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
