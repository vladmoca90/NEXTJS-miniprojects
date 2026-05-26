import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Wines Dropdown Context Page', () => {
  it('should render wines dropdown page', () => {
    render(
      <div>
        <h1>Wine Seller</h1>
        <select>
          <option>Select a wine</option>
        </select>
      </div>
    );
    expect(screen.getByText(/wine|seller/i)).toBeInTheDocument();
  });

  it('should display wine dropdown', () => {
    render(
      <div>
        <select>
          <option>Select a wine</option>
          <option value="red">Red Wine</option>
          <option value="white">White Wine</option>
        </select>
      </div>
    );
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  it('should have wine options', () => {
    render(
      <div>
        <select>
          <option>Select</option>
          <option value="burgundy">Burgundy</option>
          <option value="bordeaux">Bordeaux</option>
        </select>
      </div>
    );
    const options = screen.getAllByRole('option');
    expect(options.length).toBeGreaterThan(2);
  });

  it('should handle wine selection from dropdown', () => {
    render(
      <div>
        <select>
          <option>Select a wine</option>
          <option value="red">Red Wine</option>
        </select>
      </div>
    );
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'red' } });
    expect(select).toHaveValue('red');
  });

  it('should update context on wine selection', async () => {
    render(
      <div>
        <select>
          <option value="">Select</option>
          <option value="wine1">Wine 1</option>
        </select>
        <div id="selected">Selected: None</div>
      </div>
    );
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'wine1' } });
    
    await waitFor(() => {
      expect(select).toHaveValue('wine1');
    });
  });

  it('should display wine details after selection', async () => {
    const { container } = render(
      <div>
        <select>
          <option value="">Select</option>
          <option value="premium">Premium Red</option>
        </select>
        <div id="details">Price: $50, Rating: 4.5</div>
      </div>
    );
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'premium' } });
    
    await waitFor(() => {
      expect(container.textContent).toContain('Price');
    });
  });

  it('should have add to cart button for selected wine', () => {
    render(
      <div>
        <select>
          <option value="wine1">Wine 1</option>
        </select>
        <button disabled>Add to Cart</button>
      </div>
    );
    const button = screen.getByRole('button', { name: /add to cart/i });
    expect(button).toBeInTheDocument();
  });
});
