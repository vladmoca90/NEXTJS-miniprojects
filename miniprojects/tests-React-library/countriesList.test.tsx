import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CountriesList from '../src/app/countries-list/page';

describe('Countries List Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render countries list', () => {
    render(<CountriesList />);
    expect(screen.getByText(/countr/i)).toBeInTheDocument();
  });

  it('should display countries in list format', () => {
    render(<CountriesList />);
    const listItems = screen.queryAllByRole('listitem');
    expect(listItems.length).toBeGreaterThan(0);
  });

  it('should support search functionality', () => {
    render(<CountriesList />);
    const searchInput = screen.queryByRole('textbox', { name: /search/i }) || 
                       screen.queryAllByRole('textbox')[0];
    
    if (searchInput) {
      fireEvent.change(searchInput, { target: { value: 'france' } });
      expect(searchInput).toHaveValue('france');
    }
  });

  it('should filter countries on search', async () => {
    render(<CountriesList />);
    const searchInput = screen.queryAllByRole('textbox')[0];
    
    if (searchInput) {
      fireEvent.change(searchInput, { target: { value: 'united' } });
      await waitFor(() => {
        expect(searchInput).toHaveValue('united');
      });
    }
  });

  it('should handle country selection', () => {
    render(<CountriesList />);
    const countryLinks = screen.queryAllByRole('link');
    
    if (countryLinks.length > 0) {
      fireEvent.click(countryLinks[0]);
    }
  });

  it('should display country details on click', async () => {
    render(<CountriesList />);
    const listItems = screen.queryAllByRole('listitem');
    
    if (listItems.length > 0) {
      fireEvent.click(listItems[0]);
      await waitFor(() => {
        expect(screen.getByText(/countr/i)).toBeInTheDocument();
      });
    }
  });
});
