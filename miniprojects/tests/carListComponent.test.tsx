import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CarListComponent from '../src/app/CarListComponent';
import { Car } from '../data/cars/Car';

const mockCar: Car = {
  make: 'Toyota',
  model: 'Camry',
  price: '25000',
  img: '/images/carsShowroom/toyota-camry.jpg',
  year: 2022,
};

describe('CarListComponent', () => {
  it('renders car details correctly', () => {
    render(<CarListComponent car={mockCar} />);

    // Check title
    expect(screen.getByText('Toyota Camry')).toBeInTheDocument();

    // Check price
    expect(screen.getByText('£25,000')).toBeInTheDocument();

    // Check monthly price calculation: 25000 / 12 = 2083.333, toFixed(0) = 2083
    expect(screen.getByText('from £2083/monthly')).toBeInTheDocument();

    // Check image
    expect(screen.getByRole('img', { name: 'Toyota Camry' })).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', '/images/carsShowroom/toyota-camry.jpg');

    // Check links
    expect(screen.getByRole('link', { name: 'Enquiry' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Share' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Brochure' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Full details' })).toBeInTheDocument();
  });

  it('calculates monthly price correctly when price is a number', () => {
    const carWithNumberPrice: Car = { ...mockCar, price: 30000 as any }; // Type assertion for test
    render(<CarListComponent car={carWithNumberPrice} />);

    expect(screen.getByText('£30,000')).toBeInTheDocument();
    expect(screen.getByText('from £2500/monthly')).toBeInTheDocument(); // 30000 / 12 = 2500
  });
});