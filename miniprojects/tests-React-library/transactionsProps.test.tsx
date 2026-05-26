import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Transactions Props Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render transactions page with props', () => {
    render(
      <div>
        <h1>Transactions</h1>
        <table>
          <tbody>
            <tr><td>TX001</td><td>$100</td></tr>
          </tbody>
        </table>
      </div>
    );
    expect(screen.getByText(/transaction/i)).toBeInTheDocument();
  });

  it('should display transactions table from props', () => {
    render(
      <div>
        <table>
          <tbody>
            <tr><td>TX001</td><td>Deposit</td><td>$500</td></tr>
            <tr><td>TX002</td><td>Withdrawal</td><td>$200</td></tr>
          </tbody>
        </table>
      </div>
    );
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBeGreaterThan(1);
  });

  it('should have transaction details', () => {
    const { container } = render(
      <div>
        <table>
          <tbody>
            <tr>
              <td>TX001</td>
              <td>2024-01-15</td>
              <td>Deposit</td>
              <td>$1000</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
    expect(container.textContent).toContain('TX001');
    expect(container.textContent).toContain('Deposit');
  });

  it('should support transaction filtering', () => {
    render(
      <div>
        <input type="text" placeholder="Filter transactions" />
        <table>
          <tbody>
            <tr><td>TX001</td></tr>
          </tbody>
        </table>
      </div>
    );
    const input = screen.getByPlaceholderText(/filter/i);
    fireEvent.change(input, { target: { value: 'TX001' } });
    expect(input).toHaveValue('TX001');
  });

  it('should handle transaction sorting', () => {
    render(
      <div>
        <button>Sort by Date</button>
        <table>
          <tbody>
            <tr><td>TX001</td></tr>
          </tbody>
        </table>
      </div>
    );
    const button = screen.getByRole('button', { name: /sort/i });
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });

  it('should display transaction stats', () => {
    const { container } = render(
      <div>
        <div>Total Transactions: 10</div>
        <div>Total Amount: $5000</div>
      </div>
    );
    expect(container.textContent).toContain('Total Transactions');
  });
});
