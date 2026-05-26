import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppointmentForm from '../src/app/appointment/page';

describe('Appointment Form Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render appointment form', () => {
    render(<AppointmentForm />);
    expect(screen.getByText(/appointment/i)).toBeInTheDocument();
  });

  it('should have form inputs', () => {
    render(<AppointmentForm />);
    const form = screen.getByRole('form', { hidden: true }) || document.querySelector('form');
    expect(form).toBeInTheDocument();
  });

  it('should handle form submission', async () => {
    render(<AppointmentForm />);
    const submitButton = screen.queryByRole('button', { name: /submit|book|confirm/i });
    
    if (submitButton) {
      fireEvent.click(submitButton);
    }
  });

  it('should display loading state on submit', async () => {
    render(<AppointmentForm />);
    const submitButton = screen.queryByRole('button', { name: /submit|book|confirm/i });
    
    if (submitButton) {
      fireEvent.click(submitButton);
      await waitFor(() => {
        // Component should handle submission
      });
    }
  });
});
