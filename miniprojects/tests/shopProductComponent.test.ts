import { render, screen, fireEvent } from '@testing-library/react';
import ProductListComponent from '../src/app/ShopProductComponent';
import { Product } from '../data/shop-products/Product';

const mockProduct: Product = {
  name: 'Test Product',
  image: '/images/shop/test.jpg',
  price: 9.99,
};

describe('ProductListComponent', () => {
  const mockOnCountUpdatedAdd = jest.fn();
  const mockOnCountUpdatedRemove = jest.fn();

  const defaultProps = {
    product: mockProduct,
    onCountUpdatedAdd: mockOnCountUpdatedAdd,
    onCountUpdatedRemove: mockOnCountUpdatedRemove,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product details correctly', () => {
    render(<ProductListComponent {...defaultProps} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('£9.99')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Test Product' })).toBeInTheDocument();
  });

  it('displays initial counter as 0', () => {
    render(<ProductListComponent {...defaultProps} />);

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('increments counter and calls onCountUpdatedAdd when add button is clicked', () => {
    render(<ProductListComponent {...defaultProps} />);

    const addButton = screen.getByRole('button', { name: '+' });
    fireEvent.click(addButton);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(mockOnCountUpdatedAdd).toHaveBeenCalledTimes(1);
  });

  it('decrements counter and calls onCountUpdatedRemove when remove button is clicked and counter > 0', () => {
    render(<ProductListComponent {...defaultProps} />);

    const addButton = screen.getByRole('button', { name: '+' });
    const removeButton = screen.getByRole('button', { name: '-' });

    fireEvent.click(addButton); // counter = 1
    fireEvent.click(removeButton); // counter = 0

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(mockOnCountUpdatedRemove).toHaveBeenCalledTimes(1);
  });

  it('does not decrement counter below 0 and does not call onCountUpdatedRemove when counter is 0', () => {
    render(<ProductListComponent {...defaultProps} />);

    const removeButton = screen.getByRole('button', { name: '-' });
    fireEvent.click(removeButton);

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(mockOnCountUpdatedRemove).not.toHaveBeenCalled();
  });

  it('handles multiple add and remove operations correctly', () => {
    render(<ProductListComponent {...defaultProps} />);

    const addButton = screen.getByRole('button', { name: '+' });
    const removeButton = screen.getByRole('button', { name: '-' });

    fireEvent.click(addButton); // 1
    fireEvent.click(addButton); // 2
    fireEvent.click(removeButton); // 1
    fireEvent.click(removeButton); // 0
    fireEvent.click(removeButton); // still 0

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(mockOnCountUpdatedAdd).toHaveBeenCalledTimes(2);
    expect(mockOnCountUpdatedRemove).toHaveBeenCalledTimes(2);
  });
});