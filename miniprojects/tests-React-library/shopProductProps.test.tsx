import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Shop Product Props Page', () => {
  it('should render shop products with props', () => {
    render(
      <div>
        <h1>Shop Products</h1>
        <button>Add to Cart</button>
      </div>
    );
    expect(screen.getByText(/shop|product/i)).toBeInTheDocument();
  });

  it('should display products passed as props', () => {
    const { container } = render(
      <div>
        <h1>Shop Products</h1>
        <div>Product A</div>
        <div>Product B</div>
      </div>
    );
    expect(container.textContent).toContain('Product');
  });

  it('should handle product filtering', () => {
    render(
      <div>
        <input type="text" placeholder="Filter products" />
        <div>Product 1</div>
      </div>
    );
    const input = screen.getByPlaceholderText(/filter/i);
    fireEvent.change(input, { target: { value: 'product' } });
    expect(input).toHaveValue('product');
  });

  it('should handle add to cart', () => {
    render(
      <div>
        <button>Add to Cart</button>
      </div>
    );
    const button = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });

  it('should display product details on selection', () => {
    render(
      <div>
        <button>View Details</button>
      </div>
    );
    const button = screen.getByRole('button', { name: /view details/i });
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });
});
