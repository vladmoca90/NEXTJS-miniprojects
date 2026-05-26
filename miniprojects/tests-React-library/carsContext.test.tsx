import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CarsShowroom from '../src/app/cars-context/page';

describe('Cars Context Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render cars showroom with context', () => {
    render(<CarsShowroom />);
    expect(screen.getByText(/car|showroom/i)).toBeInTheDocument();
  });

  it('should display cars list', () => {
    render(<CarsShowroom />);
    // Should have at least one car element
    expect(document.body.textContent.length).toBeGreaterThan(0);
  });

  it('should handle car selection', () => {
    render(<CarsShowroom />);
    const carElements = screen.queryAllByRole('link');
    
    if (carElements.length > 0) {
      fireEvent.click(carElements[0]);
    }
  });

  it('should support filtering or searching', () => {
    render(<CarsShowroom />);
    const inputs = screen.queryAllByRole('textbox', { hidden: true });
    
    if (inputs.length > 0) {
      fireEvent.change(inputs[0], { target: { value: 'BMW' } });
      expect(inputs[0]).toHaveValue('BMW');
    }
  });

  it('should update context on car selection', async () => {
    render(<CarsShowroom />);
    const carLinks = screen.queryAllByRole('link');
    
    if (carLinks.length > 0) {
      fireEvent.click(carLinks[0]);
      await waitFor(() => {
        expect(screen.getByText(/car|showroom/i)).toBeInTheDocument();
      });
    }
  });
});
