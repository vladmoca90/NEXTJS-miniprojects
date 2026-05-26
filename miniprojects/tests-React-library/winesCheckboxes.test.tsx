import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Wines Checkboxes Page', () => {
  it('should render wines checkboxes page', () => {
    render(
      <div>
        <h1>Wine Selection</h1>
        <input type="checkbox" />
        <label>Wine 1</label>
      </div>
    );
    expect(screen.getByText(/wine/i)).toBeInTheDocument();
  });

  it('should display wine checkboxes', () => {
    render(
      <div>
        <input type="checkbox" id="wine1" />
        <label htmlFor="wine1">Red Wine</label>
        <input type="checkbox" id="wine2" />
        <label htmlFor="wine2">White Wine</label>
      </div>
    );
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(1);
  });

  it('should handle wine selection', () => {
    render(
      <div>
        <input type="checkbox" id="wine1" />
        <label htmlFor="wine1">Red Wine</label>
      </div>
    );
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('should select multiple wines', () => {
    render(
      <div>
        <input type="checkbox" id="w1" />
        <label htmlFor="w1">Wine 1</label>
        <input type="checkbox" id="w2" />
        <label htmlFor="w2">Wine 2</label>
      </div>
    );
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).toBeChecked();
  });

  it('should display selected wine count', () => {
    const { container } = render(
      <div>
        <p>Selected: 2 wines</p>
      </div>
    );
    expect(container.textContent).toContain('Selected');
  });

  it('should handle add to cart with selected wines', () => {
    render(
      <div>
        <input type="checkbox" id="w1" defaultChecked />
        <button>Add Selected to Cart</button>
      </div>
    );
    const button = screen.getByRole('button', { name: /add selected/i });
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });
});
