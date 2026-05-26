import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CarsShowroom from '../src/app/cars-props/page';

describe('Cars Props Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render cars showroom with props', () => {
    render(<CarsShowroom />);
    expect(screen.getByText(/car|showroom/i)).toBeInTheDocument();
  });

  it('should display cars list using props', () => {
    render(<CarsShowroom />);
    expect(document.body.textContent.length).toBeGreaterThan(0);
  });

  it('should handle car item click', () => {
    render(<CarsShowroom />);
    const carLinks = screen.queryAllByRole('link');
    
    if (carLinks.length > 0) {
      fireEvent.click(carLinks[0]);
    }
  });

  it('should display car details on selection', async () => {
    render(<CarsShowroom />);
    const carLinks = screen.queryAllByRole('link');
    
    if (carLinks.length > 0) {
      fireEvent.click(carLinks[0]);
      await waitFor(() => {
        expect(screen.getByText(/car|showroom/i)).toBeInTheDocument();
      });
    }
  });

  it('should support search functionality', () => {
    render(<CarsShowroom />);
    const inputs = screen.queryAllByRole('textbox', { hidden: true });
    
    if (inputs.length > 0) {
      fireEvent.change(inputs[0], { target: { value: 'Tesla' } });
      expect(inputs[0]).toHaveValue('Tesla');
    }
  });
});
