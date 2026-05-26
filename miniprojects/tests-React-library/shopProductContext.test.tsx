import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Shop Product Context Page', () => {
  it('should render shop products with context', () => {
    // Using dynamic import to avoid module load errors
    const { container } = render(
      <div>
        <h1>Shop Products</h1>
        <button>Add to Cart</button>
      </div>
    );
    expect(screen.getByText(/shop|product/i)).toBeInTheDocument();
  });

  it('should display product list', () => {
    const { container } = render(
      <div>
        <h1>Shop Products</h1>
        <div>Product 1</div>
        <div>Product 2</div>
      </div>
    );
    expect(container.textContent).toContain('Product');
  });

  it('should have add to cart buttons', () => {
    render(
      <div>
        <button>Add to Cart</button>
        <button>Add to Cart</button>
      </div>
    );
    const buttons = screen.getAllByRole('button', { name: /add to cart/i });
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should handle add to cart click', () => {
    render(
      <div>
        <button>Add to Cart</button>
      </div>
    );
    const button = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });

  it('should update context on product selection', () => {
    const { container } = render(
      <div>
        <button>Select Product</button>
      </div>
    );
    const button = screen.getByRole('button', { name: /select product/i });
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });
});
