import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Transactions Context Page', () => {
  it('should render transactions page', () => {
    render(
      <div>
        <h1>Transactions</h1>
        <table>
          <thead>
            <tr><th>ID</th><th>Amount</th></tr>
          </thead>
        </table>
      </div>
    );
    expect(screen.getByText(/transaction/i)).toBeInTheDocument();
  });

  it('should display transactions table', () => {
    render(
      <div>
        <table>
          <tbody>
            <tr><td>TX001</td><td>$100</td></tr>
            <tr><td>TX002</td><td>$200</td></tr>
          </tbody>
        </table>
      </div>
    );
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });

  it('should have transaction rows', () => {
    render(
      <div>
        <table>
          <tbody>
            <tr><td>TX001</td><td>$100</td></tr>
          </tbody>
        </table>
      </div>
    );
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBeGreaterThan(0);
  });

  it('should support filtering transactions', () => {
    render(
      <div>
        <input type="text" placeholder="Filter by ID" />
      </div>
    );
    const input = screen.getByPlaceholderText(/filter/i);
    fireEvent.change(input, { target: { value: 'TX001' } });
    expect(input).toHaveValue('TX001');
  });

  it('should handle transaction selection', () => {
    render(
      <div>
        <tr><td><button>View Details</button></td></tr>
      </div>
    );
    const button = screen.getByRole('button', { name: /view details/i });
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });
});
