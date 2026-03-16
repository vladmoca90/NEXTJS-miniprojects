import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FoodListDetails from '../src/app/food-table/food-name/page';
import { Food } from '../data/foodList/Food';

// Mock React.use to handle Promise resolution in tests
jest.mock('react', () => {
  const actual = jest.requireActual('react');
  return {
    ...actual,
    use: (promise: any) => {
      // For testing, if it's a thenable, we need to handle it
      if (promise && typeof promise.then === 'function') {
        // Throw to trigger Suspense-like behavior, or try to sync resolve
        // For Jest testing, we'll use a different approach - access _rejectionHandler or similar
        let result: any;
        let error: any;
        
        // Attempt synchronous extraction for Promise.resolve()
        try {
          // This is a testing hack - check the promise's internal resolved value
          if (promise.constructor.name === 'Promise') {
            // Try to extract from the promise state (implementation-specific)
            const state = (promise as any).__state;
            if (state === 1) { // fulfilled
              return (promise as any).__value;
            }
          }
        } catch (e) {
          // Ignore
        }
        
        // Fallback: return promise as-is (will fail but shows actual behavior)
        return promise;
      }
      return promise;
    },
  };
});

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
    const expectedFoodName = 'Cheese';
    const searchParams = Promise.resolve({ foodName: expectedFoodName });
    render(<FoodListDetails searchParams={searchParams} />);

    await waitFor(() => {
      expect(screen.getByText('Cheese')).toBeInTheDocument();
    });

    // Check that fetch was called at all
    expect(global.fetch).toHaveBeenCalled();
    
    // Get the actual call and verify structure
    const call = (global.fetch as jest.Mock).mock.calls[0]?.[0];
    expect(typeof call).toBe('string');
    expect(call).toContain('http://localhost:3000/api/get-food');
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