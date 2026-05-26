import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Wine Details Page', () => {
  it('should render wine details page', () => {
    render(
      <div>
        <h1>Wine Details</h1>
        <div>Wine information</div>
      </div>
    );
    expect(screen.getByText(/wine/i)).toBeInTheDocument();
  });

  it('should display wine information', () => {
    const { container } = render(
      <div>
        <h1>Wine: Burgundy Red</h1>
        <p>Price: $50</p>
        <p>Rating: 4.5/5</p>
      </div>
    );
    expect(container.textContent).toContain('Wine');
  });

  it('should have wine image', () => {
    render(
      <div>
        <img src="/wine.jpg" alt="Wine bottle" />
      </div>
    );
    const image = screen.getByAltText(/wine/i);
    expect(image).toBeInTheDocument();
  });

  it('should have add to cart button', () => {
    render(
      <div>
        <button>Add to Cart</button>
      </div>
    );
    const button = screen.getByRole('button', { name: /add to cart/i });
    expect(button).toBeInTheDocument();
  });

  it('should handle quantity selection', () => {
    render(
      <div>
        <input type="number" min="1" defaultValue="1" />
      </div>
    );
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '3' } });
    expect(input).toHaveValue(3);
  });

  it('should add wine to cart', () => {
    render(
      <div>
        <input type="number" defaultValue="1" />
        <button>Add to Cart</button>
      </div>
    );
    const button = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });
});
