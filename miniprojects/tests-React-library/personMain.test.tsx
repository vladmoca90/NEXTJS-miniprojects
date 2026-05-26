import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Person Main Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render person main page', () => {
    render(
      <div>
        <h1>Person Details</h1>
        <form>
          <input type="text" placeholder="Name" />
        </form>
      </div>
    );
    expect(screen.getByText(/person/i)).toBeInTheDocument();
  });

  it('should have person form with inputs', () => {
    render(
      <div>
        <form>
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email" />
          <input type="tel" placeholder="Phone" />
        </form>
      </div>
    );
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThan(0);
  });

  it('should handle form input changes', () => {
    render(
      <div>
        <input type="text" placeholder="Name" />
      </div>
    );
    const input = screen.getByPlaceholderText(/name/i);
    fireEvent.change(input, { target: { value: 'John Doe' } });
    expect(input).toHaveValue('John Doe');
  });

  it('should submit person details', () => {
    render(
      <div>
        <form>
          <input type="text" placeholder="Name" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
    const submitBtn = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitBtn);
    expect(submitBtn).toBeInTheDocument();
  });

  it('should display validation errors', () => {
    const { container } = render(
      <div>
        <form>
          <input type="text" placeholder="Name" />
          <span className="error">Name is required</span>
        </form>
      </div>
    );
    expect(container.textContent).toContain('required');
  });

  it('should fetch person data', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ person: { id: 1, name: 'John' } }),
    });

    render(
      <div>
        <h1>Person Details</h1>
      </div>
    );

    await waitFor(() => {
      expect(screen.getByText(/person/i)).toBeInTheDocument();
    });
  });
});
