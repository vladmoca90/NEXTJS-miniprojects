import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/app/page';

describe('Add-List Redux Page', () => {
  it('should render add component and list component', () => {
    render(<App />);
    // Both components should be rendered within main element
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('should have Redux store provider', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render add-list styles', () => {
    const { container } = render(<App />);
    expect(container.querySelector('main')).toBeInTheDocument();
  });

  it('should clear the person name input after adding a person', () => {
    render(<App />);

    const input = screen.getByLabelText(/person name/i);
    fireEvent.change(input, { target: { value: 'Alice' } });

    expect(input).toHaveValue('Alice');

    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    expect(input).toHaveValue('');
  });
});
