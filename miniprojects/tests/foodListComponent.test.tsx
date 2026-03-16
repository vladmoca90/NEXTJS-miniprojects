import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FoodListDetails from '../src/app/food-table/food-name/page';
import { Food } from '../data/foodList/Food';

const mockFood: Food = {
  img: 'cheese.PNG',
  name: 'Cheese',
  price: 7.99,
  quantity: 0.4,
  unit: 'kg',
  id: 1,
};

describe('FoodListDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ food: mockFood }),
      }) as any
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders loading state initially', () => {
    const searchParams = Promise.resolve({ foodName: 'Cheese' });
    render(<FoodListDetails searchParams={searchParams} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('fetches and displays food details after loading', async () => {
    const searchParams = Promise.resolve({ foodName: 'Cheese' });
    render(<FoodListDetails searchParams={searchParams} />);

    await waitFor(() => {
      expect(screen.getByText('Cheese')).toBeInTheDocument();
    });

    expect(screen.getByText('7.99')).toBeInTheDocument();
    expect(screen.getByText('kg')).toBeInTheDocument();
    expect(screen.getByText('0.4')).toBeInTheDocument();
  });

  it('displays correct total price calculation (price * quantity)', async () => {
    const searchParams = Promise.resolve({ foodName: 'Cheese' });
    render(<FoodListDetails searchParams={searchParams} />);

    await waitFor(() => {
      expect(screen.getByText('Cheese')).toBeInTheDocument();
    });

    // Total price should be 7.99 * 0.4 = 3.196, formatted to 3.20
    expect(screen.getByText('3.20')).toBeInTheDocument();
  });

  it('calls fetch API with correct foodName parameter', async () => {
    const searchParams = Promise.resolve({ foodName: 'Cheese' });
    render(<FoodListDetails searchParams={searchParams} />);

    await waitFor(() => {
      expect(screen.getByText('Cheese')).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('http://localhost:3000/api/get-food')
    );
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('foodName=Cheese')
    );
  });

  it('displays image with correct alt text', async () => {
    const searchParams = Promise.resolve({ foodName: 'Cheese' });
    render(<FoodListDetails searchParams={searchParams} />);

    await waitFor(() => {
      expect(screen.getByText('Cheese')).toBeInTheDocument();
    });

    expect(screen.getByAltText('Cheese')).toBeInTheDocument();
  });

  it('displays table headers correctly', async () => {
    const searchParams = Promise.resolve({ foodName: 'Cheese' });
    render(<FoodListDetails searchParams={searchParams} />);

    await waitFor(() => {
      expect(screen.getByText('Cheese')).toBeInTheDocument();
    });

    expect(screen.getByText('Picture')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Price (£)')).toBeInTheDocument();
    expect(screen.getByText('Unit')).toBeInTheDocument();
    expect(screen.getByText('Quantity')).toBeInTheDocument();
    expect(screen.getByText('Total price (£)')).toBeInTheDocument();
  });

  it('handles API error gracefully', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
      }) as any
    );

    const searchParams = Promise.resolve({ foodName: 'Invalid' });
    render(<FoodListDetails searchParams={searchParams} />);

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });
});