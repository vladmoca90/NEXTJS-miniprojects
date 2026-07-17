import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FoodTablePage from '../src/app/page';

describe('Food Table Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render food table', () => {
    render(<FoodTablePage />);
    expect(screen.getByText(/food|table/i)).toBeInTheDocument();
  });

  it('should display table with food items', () => {
    render(<FoodTablePage />);
    const table = screen.queryByRole('table');
    expect(table).toBeInTheDocument();
  });

  it('should have table headers', () => {
    render(<FoodTablePage />);
    const headerCells = screen.queryAllByRole('columnheader');
    expect(headerCells.length).toBeGreaterThan(0);
  });

  it('should display food items in table rows', () => {
    render(<FoodTablePage />);
    const rows = screen.queryAllByRole('row');
    expect(rows.length).toBeGreaterThan(1); // Header + food items
  });

  it('should have food details links', () => {
    render(<FoodTablePage />);
    const links = screen.queryAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('should handle food item click', () => {
    render(<FoodTablePage />);
    const links = screen.queryAllByRole('link');
    
    if (links.length > 0) {
      fireEvent.click(links[0]);
    }
  });

  it('should display image for each food item', () => {
    render(<FoodTablePage />);
    const images = screen.queryAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });
});
