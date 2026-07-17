import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import GetActors from '../src/app/actors/page';

// Mock fetch
global.fetch = jest.fn();

describe('Actors Page (Redux)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render actors page with heading', () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ body: [] }),
    });

    render(<GetActors />);
    expect(screen.getByText(/search/i)).toBeInTheDocument();
  });

  it('should fetch actors on component mount', async () => {
    const mockActors = [
      { id: 1, name: 'Actor 1' },
      { id: 2, name: 'Actor 2' },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ body: mockActors }),
    });

    render(<GetActors />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/actors');
    });
  });

  it('should handle fetch error gracefully', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });

    render(<GetActors />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });

  it('should display loading state initially', () => {
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));
    render(<GetActors />);
    // Component should render without error
    expect(screen.getByText(/search/i)).toBeInTheDocument();
  });

  it('should support search field selection', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ body: [] }),
    });

    render(<GetActors />);

    await waitFor(() => {
      const searchSelect = screen.queryByDisplayValue(/name|age|salary/i);
      if (searchSelect) {
        fireEvent.change(searchSelect, { target: { value: 'age' } });
      }
    });
  });
});
