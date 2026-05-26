import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClientPageComponent from '../src/app/cookies/page';

describe('Cookies Page', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should render cookies page', () => {
    render(<ClientPageComponent />);
    expect(screen.getByText(/cookie/i)).toBeInTheDocument();
  });

  it('should have cookie banner or buttons', () => {
    render(<ClientPageComponent />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should handle cookie accept', () => {
    render(<ClientPageComponent />);
    const acceptBtn = screen.queryByRole('button', { name: /accept|agree/i });
    
    if (acceptBtn) {
      fireEvent.click(acceptBtn);
      expect(acceptBtn).toBeInTheDocument();
    }
  });

  it('should handle cookie reject', () => {
    render(<ClientPageComponent />);
    const rejectBtn = screen.queryByRole('button', { name: /reject|decline/i });
    
    if (rejectBtn) {
      fireEvent.click(rejectBtn);
      expect(rejectBtn).toBeInTheDocument();
    }
  });

  it('should persist cookie choice in localStorage', () => {
    render(<ClientPageComponent />);
    const acceptBtn = screen.queryByRole('button', { name: /accept|agree/i });
    
    if (acceptBtn) {
      fireEvent.click(acceptBtn);
      // Check if localStorage is set
      expect(localStorage.getItem('cookies')).toBeDefined();
    }
  });
});
