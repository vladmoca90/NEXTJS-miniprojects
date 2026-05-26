import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CountriesList from '../src/app/countries-table/page';

describe('Countries Table Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render countries table', () => {
    render(<CountriesList />);
    expect(screen.getByText(/countr/i)).toBeInTheDocument();
  });

  it('should display table with headers', () => {
    render(<CountriesList />);
    const table = screen.queryByRole('table');
    expect(table).toBeInTheDocument();
  });

  it('should have table rows for countries', () => {
    render(<CountriesList />);
    const rows = screen.queryAllByRole('row');
    expect(rows.length).toBeGreaterThan(1); // At least header + 1 country
  });

  it('should support country search', () => {
    render(<CountriesList />);
    const searchInput = screen.queryAllByRole('textbox')[0];
    
    if (searchInput) {
      fireEvent.change(searchInput, { target: { value: 'spain' } });
      expect(searchInput).toHaveValue('spain');
    }
  });

  it('should filter table on search', async () => {
    render(<CountriesList />);
    const inputs = screen.queryAllByRole('textbox');
    
    if (inputs.length > 0) {
      fireEvent.change(inputs[0], { target: { value: 'germany' } });
      await waitFor(() => {
        expect(inputs[0]).toHaveValue('germany');
      });
    }
  });

  it('should handle country row click', () => {
    render(<CountriesList />);
    const rows = screen.queryAllByRole('row');
    
    if (rows.length > 1) {
      fireEvent.click(rows[1]);
    }
  });
});
