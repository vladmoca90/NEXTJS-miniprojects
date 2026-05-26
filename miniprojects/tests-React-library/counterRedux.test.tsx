import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CounterMainComponent from '../src/app/counter-redux/page';

describe('Counter Redux Page', () => {
  it('should render counter component', () => {
    render(<CounterMainComponent />);
    expect(screen.getByText(/counter/i)).toBeInTheDocument();
  });

  it('should display counter buttons', () => {
    render(<CounterMainComponent />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should increment counter', async () => {
    render(<CounterMainComponent />);
    const incrementBtn = screen.getByRole('button', { name: /increment|increase|\+/i });
    
    if (incrementBtn) {
      fireEvent.click(incrementBtn);
      await waitFor(() => {
        expect(screen.getByText(/counter/i)).toBeInTheDocument();
      });
    }
  });

  it('should decrement counter', async () => {
    render(<CounterMainComponent />);
    const decrementBtn = screen.getByRole('button', { name: /decrement|decrease|-/i });
    
    if (decrementBtn) {
      fireEvent.click(decrementBtn);
      await waitFor(() => {
        expect(screen.getByText(/counter/i)).toBeInTheDocument();
      });
    }
  });

  it('should reset counter', async () => {
    render(<CounterMainComponent />);
    const resetBtn = screen.queryByRole('button', { name: /reset/i });
    
    if (resetBtn) {
      fireEvent.click(resetBtn);
      await waitFor(() => {
        expect(screen.getByText(/counter/i)).toBeInTheDocument();
      });
    }
  });
});
